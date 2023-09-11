const express=require("express");
const bcrypt = require('bcrypt');

const users_query=require('../../Database/users_query');

const authUtils= require('../../middlewares/auth-utils');

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

/*
//Configuring the register post functionality
router.post('/signup',async(req,res)=>{

    const gmail=req.body.email;
    const username=req.body.username;
    const password=req.body.password;
    const confirmPassword=req.body.confirmPassword;
    const user_id =  Date.now().toString();

   
    let errors=[],result=[];
    
    result=await users_query.getUserByUsername(username);

    if(result==undefined)
    {
        result= await users_query.getUserByEmail(gmail);

        if(result==undefined)
        {
            if(password==confirmPassword)
            {
                if(password.length < 8)
                {
                    errors.push("Password should be 8 characters or more");
                }
                else{
                    //users_query.insertUser(insertSql,insertBindings);
                    users_query.insertUser(user_id, username, gmail, password);

                    await authUtils.loginUser(res,gmail);

                    res.redirect('/login');
                }

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
*/

router.post('/signup', async (req, res) => {
    const gmail = req.body.email;
    const username = req.body.username;
    const plainTextPassword = req.body.password; // Get the plain text password
    const confirmPassword = req.body.confirmPassword;
    const user_id = Date.now().toString();
  
    let errors = [],
      result = [];
  
    result = await users_query.getUserByUsername(username);
  
    if (result == undefined) {
      result = await users_query.getUserByEmail(gmail);
  
      if (result == undefined) {
        if (plainTextPassword == confirmPassword) {
          if (plainTextPassword.length < 8) {
            errors.push('Password should be 8 characters or more');
          } else {
            // Hash the plain text password
            bcrypt.hash(plainTextPassword, 10, async (err, hashedPassword) => {
              if (err) {
                // Handle the error
                console.error('Error hashing password:', err);
                res.status(500).send('Internal Server Error');
              } else {
                // Store the hashed password in the database
                await users_query.insertUser(user_id, username, gmail, hashedPassword);
  
                // Now, you can use the hashed password in your authentication
                await authUtils.loginUser(res, gmail);
  
                 res.redirect('/login');
                //res.render('login');
               // res.render('login',{errors});
              }
            });
          }
        } else {
          errors.push("Password doesn't match");
        }
      } else {
        errors.push('User already exists with this email');
      }
    } else {
      errors.push('Username already exists');
    }
  
    if (errors.length != 0) {
      res.render('signup', {
        user: null,
        errors: errors,
        form: {
          gmail: '',
          username: '',
          password: '',
          confirmPassword: '',
        },
      });
    }

  });
  






module.exports=router;