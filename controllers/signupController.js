
// const signup= require('../models/user');
// const bcrypt = require('bcrypt');
// const signupController= async(req,res)=>{
//     try {
        
//         const password= await bcrypt.hash(req.body.userPassword,10);
//         const signupdoc= new signup({
//             userName:req.body.userName,
//             email:req.body.userEmail,
//             password:password,
//         }) 
//         await signupdoc.save();
//         console.log('values stored');
//         res.send('done')
//     } catch (error) {
//         console.log('not done');
//         res.error('not done');
//     }
    
// }

module.exports=signupController;