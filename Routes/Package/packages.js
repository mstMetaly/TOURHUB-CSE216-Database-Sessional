const express = require('express');

//importing packages_query to find all packages
const packages_query = require('../../Database/packages_query');

const router = express.Router();

router.get('/packages' , async (req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        //getting all package importing packages_query
        let tours = [];

        tours = await packages_query.getAllPackages();

        return res.json(tours);
    }
});


//router for filtered packages 

router.get('/filteredPackages',async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
       const location = req.query.location;
       const date = req.query.date;
       //const location = decodeURIComponent(req.query.location);
       //const date = decodeURIComponent(req.query.date);

       console.log(" filteredPAckages router e locationn:",location,"  date: ",date);

        let tours = [];

        try{
            tours = await packages_query.getFilteredPackages(location,date);

            if(tours == undefined)
            {
                console.log("filtered packages router e null");
            }
            else{
                console.log("filter packges in router",tours);
                return res.json(tours);

            }
        }catch(err)
        {
            console.log("filtered package router e err",err);
        }

    }
});


module.exports = router;