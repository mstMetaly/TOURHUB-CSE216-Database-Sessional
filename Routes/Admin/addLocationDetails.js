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
            cb(null, 'Public/image/locationDetails_image');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        },

    }
);

const upload = multer({ storage: storage });


//post request for insertion into LOCATION_DETAILS table
router.post('/addLocationDetails',async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
        const locationId = req.body.locationId;
        const locationDetails = req.body.locationDetails;
        addPackage_query.insertLocationDetails(locationId,locationDetails);
        res.redirect('/addNewPackage');
    }
});


//post request for location details image
router.post('/addLocationDetailsImage',upload.single('locationDetailsImage'),async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
            const locationId = req.body.locationId;
            // Extract only the desired portion of the filePath
            const relativeFilePath = path.relative('Public', req.file.path);

            try{
                addPackage_query.insertLocationDetailsImage(locationId,relativeFilePath);
                res.redirect('/addNewPackage');
            }
            catch(err)
            {
                console.log("location details image insert error!",err);
            }

    }

});

module.exports = router;