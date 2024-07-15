const express = require('express');
const router = express.Router();
router.use(express.json());
const multer = require('multer');
const path = require('path');
const userRegister = require('../controller/userController.js');
const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        const location = '../public/image';
        cb( null ,path.join(__dirname,location));
    },
    filename: (req,file, cb) => {
        const name = Date.now() + '-' + file.originalname;
        cb(null,name);
    }
})

const upload = multer({storage});

router.post('/register', upload.single("image") , userRegister);


module.exports = router;