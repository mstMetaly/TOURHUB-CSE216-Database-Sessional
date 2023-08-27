const express = require('express');

//package details niye ashhbo query kore
const  packageDetails_query = require('../../Database/packageDetails_query');

const router = express.Router();

//packages Details router 
router.get('/packageDetails/:tourId' , async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        //render details page 
        const tourId = req.params.tourId;
        
        res.render('packageDetails',{tourId});
    }
});

module.exports = router;
