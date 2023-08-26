const express=require("express");
const users_query=require('../Database/users_query');

const authUtils= require('../middlewares/auth-utils');

const router=express.Router();

router.get('/signup',async(req,res)=>{

    if(req.user == null )
    {
        res.render('signup',
        {
            errors:[]
        });
    }
    else{
        res.redirect('/home');
    }
   
});

//Configuring the register post functionality
router.post('/signup',async(req,res)=>{

    const gmail=req.body.email;
    const username=req.body.username;
    const password=req.body.password;
    const confirmPassword=req.body.confirmPassword;

    const insertSql = `INSERT INTO USERS (user_id, username, gmail, password) VALUES (:user_id, :username, :gmail, :password)`;
    const insertBindings = {

        user_id: Date.now().toString(),
        username: username,
        gmail: gmail,
        password: password
    };

    let errors=[],result=[];
    
    result=await users_query.getUserByUsername(username);

    if(result==undefined)
    {
        result= await users_query.getUserByEmail(gmail);

        if(result==undefined)
        {
            if(password==confirmPassword)
            {
                users_query.insertUser(insertSql,insertBindings);
                //login the user 
                
                //let result2=await users_query.getUserByEmail(gmail);

                //console.log("result2:",result2);

                await authUtils.loginUser(res,gmail);

                res.redirect('/login');
            }
            else{
                errors.push("Password doesn't match");
            }
        }

        else{
            errors.push("User already exists with this email");
        }


    }
    else{
        errors.push("Username already exists");
    }

    if(errors.length!=0)
    {
        res.render('signup',
        {
            user:null,
            errors:errors,
            form:{
                gmail:"",
                username:"",
                password:"",
                confirmPassword:""
            }

        });

    }


});

module.exports=router;