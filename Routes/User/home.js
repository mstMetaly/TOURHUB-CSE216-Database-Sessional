const express=require("express");

const router=express.Router();

const logoutRouter=require('../Auth/logout');

router.get('/home',(req,res)=>{
    if(req.user == null)
    {
        console.log("home --req.user null astese");
        
        res.redirect('/login');
    }
    else{
        res.render('home',
        {
            errors:[]
        });
    }
    
});

router.get('/myProfile',(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        res.render('myProfile');
    }
});

module.exports= router;