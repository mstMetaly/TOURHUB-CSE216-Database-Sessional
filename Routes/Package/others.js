const express = require('express');

const packageDetails_query = require('../../Database/packageDetails_query');

const router = express.Router();

router.get('/others/:tourId',async(req,res)=>{
    if(req.user==null)
    {
        res.redirect('/login');
    }
    else{
        const tourId = req.params.tourId;
        res.render('others',{tourId});
    }
});

//router for fetchOthers
router.get('/fetchOthers/:tourId',async(req,res)=>{

    if(req.user==null)
    {
        res.redirect('/login');
    }
    else{

        const tourId = req.params.tourId;
        let descrip = [];
        descrip = await packageDetails_query.getAllOthers(tourId);

        if(descrip == undefined)
        {
            return null;
        }
        else{
            return res.json(descrip);
        }
    }
});

module.exports = router;