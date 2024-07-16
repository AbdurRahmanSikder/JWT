require('dotenv').config();
const User = require('../model/userModel');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const mailer = require('../helper/mailer.js');
const userRegister = async (req, res) => {
    try {


        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                msg : 'Errors',
                errors : errors.array()
            });
        }

        const { username, email, mobile, password, isVarified, image } = req.body;


        // const flag = await User.findOne({email});
        // if(flag)
        // {
        //     return res.status(400).json({msg : "Already register"});
        // }

        const hashpassword = await bcrypt.hash(password, 10);

        const response = new User({
            username,
            email,
            mobile,
            password: hashpassword,
            isVarified,
            image: 'image/'+req.file.filename 
        })
        
        const userData = await response.save();

        const msg = '<p> Hii , '+username+' , Please <a>Verify</a>  your mail</p>';

        mailer.sendMail(email, 'Mail Verification', msg);

        return res.status(200).json({
            success: true,
            msg: "Registered Successfully !!",
            user: userData
        })
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success: false,
            msg: err.message
        })
    }
}


module.exports = userRegister;