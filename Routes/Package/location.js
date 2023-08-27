const express = require('express');


//package details niye ashhbo query kore
const  packageDetails_query = require('../../Database/packageDetails_query');

const router = express.Router();

router.get('/location' , async(req , res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        let locations = [];

        locations =  await packageDetails_query.getAllLocationByTourId(1);
        
        return res.json(locations);
    }

});

module.exports = router;