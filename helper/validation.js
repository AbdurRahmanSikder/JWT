const {check} = require('express-validator');

exports.registerValidator = [
    check('username', 'Name is required').not().isEmpty(),
    check('email', 'please include a valid email').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
    check('mobile', 'Mobile number have to be exactly 11 digits').isLength({
        min: 11,
        max: 11
    }),
    check('password','password must be greater then 6 characters , and contains at least one uppercase letter , lowercase letter and special character').isStrongPassword({
        minLength: 6,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    check('image').custom( (value, {req}) => {
        if(req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/png')
             return true;
        else return false;
    }).withMessage(" Please upload an image Jpeg , PNG ")
]