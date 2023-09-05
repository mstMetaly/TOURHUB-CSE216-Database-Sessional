const express = require('express');
const router = express.Router();

const packageDetails_query = require('../../Database/packageDetails_query');
const publicInfo_query = require('../../Database/publicInfo_query');



const multer = require('multer');
const path = require('path');
const fs = require('fs');


//set up multer storage
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, 'Public/image/comment_image');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        },

    }
);

const upload = multer({ storage: storage });


async function saveImage(req, res) {
    try {
        // Use the uploadImage middleware to handle the file upload
        uploadImage(req, res, (err) => {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).json({ message: 'Failed to upload image' });
            }

            // File uploaded successfully, you can access the file path as req.file.path
            const imagePath = req.file.path;
            res.json({ imagePath }); // You can send back the image path to the client
        });
    } catch (error) {
        console.error('Error saving image:', error);
        res.status(500).json({ message: 'Failed to save image' });
    }
}



//route for locationDetails 
router.get('/comments/:locationId', async (req, res) => {
    if (req.user == null) {
        res.redirect('/login');
    }
    else {
        const locationId = req.params.locationId;
        let comments = await packageDetails_query.getCommentsOfLocation(locationId);

        if (comments == undefined) {
            return null;
        }
        else {
            return res.json(comments);
        }
    }
});




router.post('/storeComment/:location_id', upload.single('file'), async (req, res) => {

    if (req.user == null) {
        res.redirect('/login');

    }
    else {
        try {
            console.log("route accessed");
            const formData = req.body;
            const commentText = formData.commentText;
            const username = req.user.username;
            const imageFile = req.file; // Access the uploaded file from req.file
            const location_id = req.params.location_id;

            const insertSql = `INSERT INTO LOCATION_COMMENTS(COMMENT_TEXT, USER_NAME, IMAGE, COMMENT_DATE, PROFILE_PICTURE, LOCATION_ID) VALUES (:commentText, :username, :image, TO_DATE(:formattedDate, 'YYYY-MM-DD'), :profilePicture, :l_id)`;

            // Set image and profilePicture to null by default
            let image = null;
            let profilePicture = null;


            /*try {
                //getting profile picture
                const selectSql = `SELECT  * FROM PUBLIC_INFO WHERE USER_NAME = :username2`;
                const selectBindings = {
                    username2 : req.user.username
                };

                let result =[];
                result = await publicInfo_query.getProfilePicture(selectSql,selectBindings);
                if(result == undefined)
                {

                }
                else{
                    profilePicture = '/' + result.PROFILE_PIC;
                }

            } catch (err) {
                console.log("pro pic error ");
            }*/



            if (imageFile) {
                // Access the image path from req.file
                image = '/' + path.relative('Public', imageFile.path);
            }

            const currentDate = new Date(); // Get the current date and time

            // Format the date in a way that is compatible with your database
            const formattedDate = currentDate.toISOString().split('T')[0];

            const insertBindings = {
                commentText: commentText,
                username: username,
                image: image,
                formattedDate: formattedDate,
                profilePicture: profilePicture,
                l_id: location_id
            };

            try {
                await packageDetails_query.insertComment(insertSql, insertBindings);
                //res.status(200).json({ message: "Comment inserted successfully" });
                res.redirect(`/SeeMoreDetails/${location_id}`);
            } catch (err) {
                console.error(err);
                res.status(500).json({ message: "Failed to insert comment" });
            }
        } catch (err) {
            console.log("Comment insert router error!");
        }
    }

});



module.exports = router;