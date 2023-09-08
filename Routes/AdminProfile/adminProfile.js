const express = require('express');

const router = express.Router();

const adminProfile_query = require('../../Database/adminProfile_query');

//router for render adminProfile Page 
router.get('/myAdminProfile',async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
        res.render('AdminProfile/adminProfile');
    }
});


//router for render adminUpdateProfile Page 
router.get('/updateAdminProfile',async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
        res.render('AdminProfile/updateProfile');
    }
});

//router for render backToHome Page 
router.get('/backToHome',async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
        res.redirect('adminHome');
    }
});

//router for getFetchAdminProfile
router.get('/fetchAdminProfile' , async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
        let result = [];
        result = await adminProfile_query.getAdminProfileInfo(req.admin.gmail);
        if(result == undefined)
        {
            return null;
        }
        else{
            return res.json(result);
        }
    }
});

//update info
router.post('/updateAdminProfile',async(req,res)=>{
    if(req.admin == null)
    {
        res.redirect('/login');
    }
    else{
        const formData = req.body;

        console.log("formData:",formData);

        const user_name = formData.user_name;
        const nid = formData.nid;
        const address = formData.address;
        const gender = formData.gender;
        const nationality = formData.nationality;
        const gmail = req.admin.gmail;
        const phone_no = formData.phone_no;

        console.log("admin",req.admin);

        await adminProfile_query.updateAdminProfile(user_name,nid,address,gender,nationality,phone_no,gmail);
        res.redirect('/myAdminProfile');
    }
});

module.exports = router;