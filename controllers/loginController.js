
// const signup= require('../models/user');
// const bcrypt = require('bcrypt');
// const loginController= async(req,res)=>{
//     try {
//         const email=req.body.userEmail;
//         const pass=req.body.userPassword;
//         const login=await signup.findOne({email});
//         const loginpass=login.password;
//         if (!login) {
//             return res.send('User not found');
//           }
//         const PasswordCorrect = await bcrypt.compare(pass,loginpass);  
//         if (!PasswordCorrect) {
//             return res.send('Invalid credentials' );
//           }
//         console.log('login success');
//         res.send('login sucess');
//     } catch (error) {
//         console.log('failed',error);
//         res.send('failed');
//     }
    
// }

// module.exports=loginController;