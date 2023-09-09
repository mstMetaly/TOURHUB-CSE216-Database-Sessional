const express = require('express');

const router = express.Router();

const adminHome_query = require('../../Database/adminHome_query');

//fetch seeAllUser

router.get('/fetchSeeAllUser',async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
        let users = [];
        users = await adminHome_query.admin_getAllUser();

        return res.json(users);

    }
});

//fetch seeAllPackages

router.get('/fetchSeeAllPackages',async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
        let packs = [];
        packs = await adminHome_query.admin_getAllPackages();

        return res.json(packs);

    }
});

//fetch cancel request 

router.get('/fetchCancelRequest',async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
        let cancel = [];
        cancel = await adminHome_query.getAllCancelRequest();

        if(cancel == undefined)
        {
            console.log("router e cancelRequest null");
        }
        else{
            console.log("router e cancelRequest:",cancel);
            return res.json(cancel);

        }
       
    }

});

//confirm cancel request 
router.get('/confirmCancelRequest/:booking_id',async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
        const booking_id = req.params.booking_id;
        try{
            await adminHome_query.confirmCancelRequest(booking_id);
            res.redirect('/notifications');
        }
        catch(err)
        {
            console.log("confirm cancel router e error khacchi!",err);
        }
    }
});

module.exports = router;