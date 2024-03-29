const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../config/index');
const RefreshToken = require('../models/token');

function signAccessToken(payload, expiryTime) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: expiryTime });
}

function signRefreshToken(payload, expiryTime) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: expiryTime });
}

function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
}

async function storeRefreshToken(token, userId) {
  try {
    const newToken = new RefreshToken({
      token: token,
      userId: userId
    });

    // store in db
    await newToken.save();
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  storeRefreshToken
};
