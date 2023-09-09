const express = require('express');

const router = express.Router();

const packageDetails_query = require('../../Database/packageDetails_query');


//routes for rendering locationDetails page
router.get('/SeeMoreDetails/:locationId' , async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        const locationId = req.params.locationId;
        res.render('locationDetails',{locationId});
    }
});


//route for locationDetails 
router.get('/locationDetails/:locationId' , async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        const locationId = req.params.locationId;
        
        let details =  await packageDetails_query.getDetailsOfLocation(locationId);

        if(details == undefined)
        {
            return null;
        }
        else{
            return res.json(details);
        }
    }
});


//router for getting location details image 
router.get('/locationDetailsImage/:locationId' , async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        const locationId = req.params.locationId;
        
        let details =  await packageDetails_query.getImagesOfLocation(locationId);

        if(details == undefined)
        {
            console.log("location details image router e null");
            return null;
        }
        else{
            console.log("rouer e imagepaths:",details);
            return res.json(details);
        }
    }
});



module.exports = router;