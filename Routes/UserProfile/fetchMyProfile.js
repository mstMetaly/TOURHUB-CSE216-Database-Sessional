const express=require("express");

const myProfile_query = require('../../Database/myProfile_query');
const users_query = require('../../Database/users_query');

const router=express.Router();

//routes

//routes for myProfile
router.get('/myProfile',(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        res.render('UserProfile/myProfile.ejs');
    }
});

//routes for currentTour history

router.get('/current-tour', async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{

        res.render('UserProfile/currentTour.ejs');
    }
});

//routes for previous tour
router.get('/previous-tour', async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{

        res.render('UserProfile/previousTour.ejs');
    }
}); 

//routes for update profile
router.get('/update-profile', async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{

        res.render('UserProfile/updateUserProfile.ejs');
    }
});


//-------//
//fetch My Profile info 
router.get('/fetchMyProfile',async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        let result = [];
        result = await users_query.getUserProfileInfo(req.user.gmail);
        if(result == undefined)
        {
            return null;
        }
        else{
            return res.json(result);
        }
    }
});


//routes for update profile info
router.post('/updateProfile',async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        const formData = req.body;

        console.log("formData:",formData);

        const user_id = req.user.user_id;
        const user_name = formData.user_name;
        const email = formData.email;
        const nid = formData.nid;
        const address = formData.address;
        const gender = formData.gender;
        const nationality = formData.nationality;

        //check user_name and email whether already exists or not
        //const user = await users_query.getUserByUsername(user_name);

        //if (user== undefined) {
          //const user = await users_query.getUserByEmail(email);
          //if (user == undefined) {

          // const selectSql = `UPDATE USER_PROFILE_INFO SET :username,:email,:nid,:address,:gender,:nationality `;
        const selectSql = `UPDATE USER_PROFILE_INFO SET USER_NAME = :user_name, GMAIL = :email, NID = :nid, ADDRESS = :address, GENDER = :gender, NATIONALITY = :nationality WHERE USER_ID = :user_id`;

        const selectBindings = {
            user_id:user_id,
            user_name : user_name,
            email : email,
            nid : nid,
            address : address,
            gender : gender,
            nationality : nationality
        };

        await myProfile_query.updateMyProfile(selectSql,selectBindings);
        //res.redirect('/myProfile');
        res.redirect('/update-profile');
          /*}
          else{
            res.status(400).json({ message: 'Email already exists' });
          }

        }
        else{
            res.status(400).json({ message: 'User_name already exists' });
        }*/
    }
});



//route for previus tour history 
router.get('/fetchPreviousTourHistory',async(req,res)=>{
        if(req.user == null)
        {
            res.redirect('/login');
        }
        else{
            let result = [];
            result= await myProfile_query.getPreviousTourHistory(req.user.user_id);

            if(result == undefined)
            {
                console.log("nothing fetched in previous tour router");
                return null;
            }
            else{
                console.log("fetched previous:",result);
                return res.json(result);
            }
        }
});



router.get('/fetchCurrentTourHistory',async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        let result = [];
        result= await myProfile_query.getCurrentTourHistory(req.user.user_id);

        if(result == undefined)
        {
            console.log("nothing fetched in previous tour router");
            return null;
        }
        else{
            console.log("fetched previous:",result);
            return res.json(result);
        }
    }
});



//cancel request for a tour 

router.get('/cancelRequest/:booking_id',async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
       try{
        const booking_id = req.params.booking_id;
        await myProfile_query.insertCancelRequest(req.user.user_id,booking_id);
        res.redirect('/current-tour');
       }
       catch(err)
       {
        console.log("Cancel request router e error!");
       }     
    }
});

module.exports = router;