const express = require('express');
const router = express.Router();

const packages_query = require('../../Database/packages_query');


//routes for fetching all comments 
router.get('/fetchReview' ,async(req,res)=>{
    if(req.user== null)
    {
        res.redirect('/login');
    }
    else{
        let review =[];
        review = await packages_query.getAllReview();

        console.log("Review route e :",review);

        return res.json(review);
    }
});

module.exports = router;