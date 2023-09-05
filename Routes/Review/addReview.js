const express = require('express');
const router = express.Router();

const review_query = require('../../Database/Review/review_query');


//routes for fetching all comments 
router.get('/AddReview' ,async(req,res)=>{
    if(req.user== null)
    {
        res.redirect('/login');
    }
    else{
       res.render('Review/writeReview.ejs');
    }
});


router.post('/writeReview',async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        const formData = req.body;
        const username = formData.username;
        const reviewContent = formData.reviewContent;

        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];

        const insertSql = `INSERT INTO PACKAGE_REVIEW(DETAILS_REVIEW ,USER_NAME ,TIME) VALUES(:reviewContent,:username,TO_DATE(:formattedDate, 'YYYY-MM-DD'))`;

        const insertBindings = {
            reviewContent : reviewContent,
            username : username,
            formattedDate : formattedDate
        };

        try{
            await review_query.insertReview(insertSql,insertBindings);
            res.redirect('/addReview');

        }
        catch(err){
            console.log("review insert error!",err);
        }
       
    }
});


module.exports = router;