const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const myProfile_query = require('../../Database/myProfile_query');


const router = express.Router();

//set up multer storage
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, 'Public/image/user_image');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        },

    }
);

const upload = multer({ storage: storage });


//routes for chnaging profile picture 
router.post('/changeProfilePic', upload.single('profile-picture'), async (req, res) => {
    if (req.user == null) {
        res.redirect('/login');
    }
    else {
        if (req.file) {


            // Extract only the desired portion of the filePath
            const relativeFilePath = path.relative('Public', req.file.path);

            const user_id = req.user.user_id;
            // You can save this filePath in the database for the user's profile
            // Update your database with the file path here
            //const selectSql = `UPDATE USER_PROFILE_INFO IMAGE_URL = : filePath WHERE USER_ID : = user_id`;
            const selectSql = `UPDATE USER_PROFILE_INFO SET IMAGE_URL = :filePath WHERE USER_ID = :user_id`;

            const selectBindings = {
                user_id: user_id,
                filePath: relativeFilePath
            };
            await myProfile_query.updateProfilePicPath(selectSql, selectBindings);
            res.redirect('/myProfile');
        }
    }
});


module.exports = router;
