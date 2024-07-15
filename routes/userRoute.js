const express = require('express');
const router = express.Router();
router.use(express.json());
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: async (req,file, cb) => {
        const location = '../public/images';
        cb( null ,path.join(__dirname,location));
    },
    filename: async (req,file, cb) => {
        const name = Date.now() + '-' + file.originalname;
        cb(null,name);
    }
})

const upload = multer({storage});
module.exports = router;