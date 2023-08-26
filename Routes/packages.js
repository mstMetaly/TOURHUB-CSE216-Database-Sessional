const express = require('express');

//importing packages_query to find all packages
const packages_query = require('../Database/packages_query');

const router = express.Router();

router.get('/packages' , async (req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        //getting all package importing packages_query
        /*
        const tours = [
        {id : 1, name: 'Coxs Bazar' ,imageSrc :'/cox-bazar.jpg',price :90},
        {id : 2, name: 'Sundarban' ,imageSrc :'/sundarban.jpeg',price : 120},
        {id : 3, name: 'Coxs Bazar' ,imageSrc :'/cox-bazar.jpg',price : 80}
        ];*/
        let tours = [];

        tours = await packages_query.getAllPackages();

         res.json(tours);
    }
});

module.exports = router;