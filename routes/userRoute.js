const express = require('express');
const router = express.Router();
router.use(express.json());
const fs = require("fs");
const multer = require('multer');
const path = require('path');
const userRegister = require('../controller/userController.js');
const {registerValidator} = require('../helper/validation.js');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const location = '../public/image';
        // if (!fs.existsSync(location))
        //     fs.mkdirSync(location);
        if (file.mimetype === 'image/jpeg' || file.mimetype === "image/png")
            cb(null, path.join(__dirname, location));
    },
    filename: (req, file, cb) => {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === "image/png")
        cb(null, true);
    else {
        cb(null, false);
    }
}

const upload = multer({
    storage,
    fileFilter: fileFilter
});

router.post('/register', upload.single("image"), registerValidator, userRegister);


module.exports = router;