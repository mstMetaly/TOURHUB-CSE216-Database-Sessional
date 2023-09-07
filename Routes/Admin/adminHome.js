const express = require('express');

const router = express.Router();

//routes for rendering adminHome
router.get('/adminHome', async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }else{
        res.render('adminHome');
    }
});

//routes for rendering seeAllUsers
router.get('/seeAllUsers' , async(req,res)=>{
    if(req.admin==null)
    {
        res.redirect('/login');
    }
    else{
        res.render('seeAllUsers');
    }
});

//routes for rendering seeAllPackages
router.get('/seeAllPackages', async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
        res.render('seeAllPackages');
    }
});

//routes for rendering addNewPackage
router.get('/addNewPackage' , async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
        res.render('addNewPackage');
    }
});

//routes for rendering notifications
router.get('/notifications' ,async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
        res.render('notifications');
    }
});

//routes for rendering adminMyProfile
router.get('/adminMyProfile',async(req,res)=>{
    if(req.admin==null)
    {
        res.redirect('/login');
    }
    else{
        res.render('AdminProfile/adminProfile.ejs');
    }
});


module.exports = router;