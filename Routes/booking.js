const express = require('express');

//all booking info from the booking page
// niye asho query kore booking_query theke

const router = express.Router();

router.get('/booking' , async(req ,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        res.render('booking');
    }
});

module.exports = router;
