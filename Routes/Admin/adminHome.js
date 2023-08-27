const express = require('express');

const router = express.Router();

//routes for adminHome
router.get('/adminHome', async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }else{
        res.render('adminHome');
    }
});

//routes for seeAllUsers
router.get('/seeAllUsers' , async(req,res)=>{
    if(req.admin==null)
    {
        res.redirect('/login');
    }
    else{
        res.render('seeAllUsers');
    }
});

//routes for seeAllPackages
router.get('/seeAllPackages', async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
        res.render('seeAllPackages');
    }
});

//routes for addNewPackage
router.get('/addNewPackage' , async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
        res.render('addNewPackage');
    }
});

//routes for notifications
router.get('/notifications' ,async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
        res.render('notifications');
    }
});

//routes for adminMyProfile
router.get('/adminMyProfile',async(req,res)=>{
    if(req.admin==null)
    {
        res.redirect('/login');
    }
    else{
        res.render('adminMyProfile');
    }
});

module.exports = router;