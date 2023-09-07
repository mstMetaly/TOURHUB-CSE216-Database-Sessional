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
            cb(null, 'Public/image/location_image');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        },

    }
);

const upload = multer({ storage: storage });


//post request for addLocationImage
router.post('/addLocation',upload.single('locationImage'),async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
            
            // Extract only the desired portion of the filePath
            const relativeFilePath = path.relative('Public', req.file.path);

            const locationId = req.body.locationId;
            const locationURL = req.body.locationURL;
            const locationRating = req.body.locationRating;
            const locationDescription = req.body.locationDescription;
            const country = req.body.country;
            const tourId = req.body.tourId;
            const locationName = req.body.locationName;
            const day =  req.body.day;

            try{

                addPackage_query.insertLocation(locationId,locationURL,locationRating,locationDescription,country,tourId,locationName,day,relativeFilePath);
                res.redirect('/addNewPackage');
            }
            catch(err)
            {
                console.log("location INFO insert error!",err);
            }

    }

});

module.exports = router;