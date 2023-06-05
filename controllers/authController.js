const joi = require("joi");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const userDTO = require("../DTO/user");
const RefreshToken=require('../models/token');
const jwtservices = require("../services/jwtservice");
const authController = {
  async Signup(req, res, next) {
    const SignupSchema = joi.object({
      userName: joi.string().min(3).max(15).required(),
      userEmail: joi.string().email().required(),
      userPassword: joi.string().required(),
      Confirm_Password: joi.ref("userPassword"),
    });

    const { error } = SignupSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    const { userName, userEmail, userPassword } = req.body;

    try {
      const EmailInUse = await UserModel.exists({ userEmail });
      const UserInuse = await UserModel.exists({ userName });
      if (EmailInUse) {
        const error = {
          status: 409,
          message: "Email already registered, use another Email",
        };
        return next(error);
      }
      if (UserInuse) {
        const error = {
          status: 409,
          message: "User Name already registered, use another Name",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    //// hashing password
    const Hashpassword = await bcrypt.hash(userPassword, 10);
    let accessToken;
    let refreshToken;

    let user;
    try {
      /// saving the data
      const SignupUser = new UserModel({
        userName,
        userEmail,
        userPassword: Hashpassword,
      });
      /// save user
      user = await SignupUser.save();
      /// tokens 
      accessToken = jwtservices.signAccessToken({ _id: user._id }, "30m");
      refreshToken = jwtservices.signRefreshToken({ _id: user._id }, "60m");

    } catch (error) {
      return next(error);
    }
    await jwtservices.storeRefreshToken(refreshToken, user._id);

    // send tokens in cookie
    await res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    await res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    const user_DTO = new userDTO(user);
    return res.status(201).json({ user: user_DTO, auth: true });
  },
  ///// Login controller
  async login(req, res, next) {
    const userLogin = joi.object({
      userEmail: joi.string().email().required(),
      userPassword: joi.string().required(),
    });

    const { error } = userLogin.validate(req.body);

    if (error) {
      return next(error);
    }

    const { userEmail, userPassword } = req.body;

    let user;

    try {
      // match username
      user = await UserModel.findOne({ userEmail });

      if (!user) {
        const error = {
          status: 401,
          message: "Invalid user email",
        };

        return next(error);
      }
      const match = await bcrypt.compare(userPassword, user.userPassword);

      if (!match) {
        const error = {
          status: 401,
          message: "Invalid password",
        };

        return next(error);
      }
    } catch (error) {
      return next(error);
    }
    const accessToken = jwtservices.signAccessToken({ _id: user._id }, "30m");
    const refreshToken = jwtservices.signRefreshToken({ _id: user._id }, "60m");
    try {
      await RefreshToken.updateOne(
        {
          _id: user._id,
        },
        { token: refreshToken },
        { upsert: true }
      );
    } catch (error) {
      return next(error);
    }

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    const user_DTO = new userDTO(user);
    return res.status(200).json({ user: user_DTO,auth:true });
  },
};
module.exports = authController;
