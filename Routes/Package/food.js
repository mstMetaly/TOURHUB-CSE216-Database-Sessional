const express = require('express');
const packageDetails_query = require('../../Database/packageDetails_query');

const router = express.Router();

router.get('/food/:tourId',async(req,res)=>{

    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        const tourId = req.params.tourId;
        res.render('food',{tourId});
    }
});

//routes for fetchFood
router.get('/fetchFood/:tourId',async(req,res)=>{
    if(req.user==null)
    {
        res.redirect('/login');
    }
    else{
        const tourId = req.params.tourId;
        let foods = [];
        foods = await packageDetails_query.getAllFood(tourId);

        if(foods == undefined)
        {
            console.log("router fetch food e null");
            return null;
        }
        else{
            return res.json(foods);
        }

    }
});

module.exports = router;