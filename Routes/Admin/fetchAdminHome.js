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


module.exports = router;