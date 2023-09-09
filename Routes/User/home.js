const express=require("express");

const router=express.Router();

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


//router for rendering search page 
router.get('/searchPage',(req,res)=>{
    if(req.user == null)
    {
        console.log("home --req.user null astese");
        
        res.redirect('/login');
    }
    else{
       
        const location = decodeURIComponent(req.query.location);
        const date = decodeURIComponent(req.query.date);

        console.log("searchPage router e location:",location , " date :",date);
        res.render('searchHomePage',
        {  
            //location : location,
           // date : date,
            //errors:[]
            location,date
        });
    }
    
});






module.exports= router;