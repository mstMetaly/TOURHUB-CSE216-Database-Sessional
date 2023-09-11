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
            cb(null, 'Public/image/package_image');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        },

    }
);

const upload = multer({ storage: storage });


//post request for insertion in  package and PACKAGE_IMAGE 
router.post('/addPackage',upload.single('tourImage'),async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
            // Extract only the desired portion of the filePath
            const relativeFilePath = path.relative('Public', req.file.path);

            const formData = req.body;
            const tourId = formData.tourId ;
            const tourName= formData.tourName;
            const price = formData.price;
            const startDate = formData.startDate;
            const endDate = formData.endDate;
            const totalDay = formData.totalDay;


            try{
                addPackage_query.insertIntoPackages(tourId,tourName,price,startDate,endDate,totalDay,relativeFilePath);
                res.redirect('/addNewPackage');
            }
            catch(err)
            {
                console.log("Package image insert error!",err);
            }

    }

});


//post request for adding instructions nad cautions 
router.post('/addInstructions',async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
        const { tourId, transportDetails, instructions, cautions } = req.body;
        // Call the function to insert the data into the database
        addPackage_query.insertInstructions(tourId, transportDetails, instructions, cautions);
        res.redirect('/addNewPackage');
    }
});

//update package  post request 
router.post('/updatePackageConfirm/:tourId' ,(req, res) => {
    // Retrieve the tourId from the request parameters
    const tourId = req.params.tourId;

   // const relativeFilePath = path.relative('Public', req.file.path);
    const formData = req.body;
    const tourName= formData.tourName;
    const price = formData.price;
    const startDate = formData.startDate;
    const endDate = formData.endDate;
    const totalDay = formData.totalDay;

    console.log("router e all info :","tourId",tourId,"name:",tourName," price :",price, " startDate :",startDate, "ebdDate:",endDate,"totalday:",totalDay);

    try{
        addPackage_query.updateIntoPackages(tourId,tourName,price,startDate,endDate,totalDay);
        res.status(200).json({ message: 'Package updated successfully.' });
    }
    catch(err)
    {
        console.log("update pack router e error",err);
    }
    
});


module.exports = router;