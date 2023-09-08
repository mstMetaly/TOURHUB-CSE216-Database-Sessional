const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const adminProfile_query = require('../../Database/adminProfile_query');


const router = express.Router();

//set up multer storage
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, 'Public/image/admin_image');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        },

    }
);

const upload = multer({ storage: storage });


//routes for chnaging profile picture 
router.post('/updateAdminProfilePic', upload.single('profile-picture'), async (req, res) => {
    if (req.admin == null) {
        res.redirect('/login');
    }
    else {
        if (req.file) {


            // Extract only the desired portion of the filePath
            const relativeFilePath = path.relative('Public', req.file.path);

            const gmail = req.admin.gmail;
            try{
                await adminProfile_query.updateProfilePicPath(gmail,relativeFilePath);
                console.log("updated successfully");
                res.redirect('/myAdminProfile');
            }
            catch(err)
            {
                console.log("change admin profile insert e :",err);
            }
           
        }
    }
});


module.exports = router;
