const express = require('express');


//package details niye ashhbo query kore
const  packageDetails_query = require('../../Database/packageDetails_query');

const router = express.Router();

router.get('/location/:tourId' , async(req , res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        let locations = [];
        
        //get the tourId
        const tourId = req.params.tourId;

        console.log("/location e : tourId",tourId);

        locations =  await packageDetails_query.getAllLocationByTourId(tourId);
        
        return res.json(locations);
    }

});


module.exports = router;