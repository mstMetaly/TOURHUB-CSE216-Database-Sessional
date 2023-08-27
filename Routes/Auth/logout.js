const express = require('express');

const users_query = require('../../Database/users_query');

//
const router = express.Router({mergeParams : true});

router.get('/logout',async(req,res)=>{

    if(req.user !== null)
    {

    }

    res.clearCookie("sessionToken");
    res.redirect('/login');
});

router.get('/adminLogout', async(req,res)=>{
    if(req.admin != null)
    {

    }
    res.clearCookie("adminSessionToken");
    res.redirect('/login');
});

module.exports = router;