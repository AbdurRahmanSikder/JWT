const User = require('../model/userModel');

const bcrypt = require('bcrypt');

const userRegister = async (req, res) => {
    try {
        const { username, email, mobile, password, isVarified, image } = req.body;


        const flag = await User.findOne({email});
        if(flag)
        {
            return res.status(400).json({msg : "Already register"});
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const response = new User({
            username,
            email,
            mobile,
            password: hashpassword,
            isVarified,
            image: 'images/'+req.file.filename 
        })
        
        const userData = await response.save();

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