const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

//exporting addPackage query  
const addPackage_query = require('../../Database/addPackage_query');

const router = express.Router();


//set up multer storage
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, 'Public/image/food_image');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        },

    }
);

const upload = multer({ storage: storage });


//post request for insertion in PACKAGE_FOOD
router.post('/addPackageFood',upload.single('foodImage'),async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
        const relativeFilePath = path.relative('Public', req.file.path);
        const tourId = req.body.tourId;
        const foodDescription = req.body.foodDescription;
        const foodName=req.body.foodName;

        try {
            addPackage_query.insertFoodImage(tourId, foodDescription,relativeFilePath,foodName);
            res.redirect('/addNewPackage');
        } 
        catch (err) {
            console.log("Food image insert error!", err);
            // Handle the error appropriately, e.g., send an error response to the client
            res.status(500).send("Error inserting food image.");
        }

    }

});



module.exports = router;