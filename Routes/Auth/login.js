const express = require("express");
const bcrypt = require('bcrypt');

const users_query = require('../../Database/users_query');
const authUtils = require('../../middlewares/auth-utils');
const authentication = require('../../middlewares/authentication');

const router = express.Router();

router.get('/login', (req, res) => {

    //if not logged in ,redirect to login page 
    if (req.user == null) {
        return res.render('login',
            {
                errors: []
            });
    }
    else {
        res.redirect('/home');
    }

});

//Configuring the login post functionality

router.post('/login', async (req, res) => {
    const gmail = req.body.email;
    const password = req.body.password;
    let loginAs = 0;

    let result = [];

    let admin_result = [];

    result = await users_query.getUserByEmail(gmail);
    admin_result = await users_query.getAdminByEmail(gmail);

    if(result)
    {
        loginAs =1 ;
    }
    else if(admin_result)
    {
        loginAs = 2;
    }

    if(loginAs == 1)
    {
        let result = [];
        let errors = [];

        result = await users_query.getUserByEmail(gmail);

        if (result == undefined) {
            errors.push('No account found with this email');
        } else {
            // Compare the provided password with the hashed password from the database
            bcrypt.compare(password, result.PASSWORD, async (err, passwordMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    res.status(500).send('Internal Server Error');
                } else if (passwordMatch) {
                    console.log('Password Matched!');
                    await authUtils.loginUser(res, gmail);
                    res.redirect('/login');

                } else {
                    errors.push('Wrong Password');
                    console.log(errors);
                    res.render('login', {
                        user: null,
                        errors: errors,
                        form: {
                            gmail: "",
                            password: "",
                            loginAs: ""
                        }
                    });
                    }

            });
        }

        if (errors.length != 0) 
        {
            console.log(errors);

            res.render('login', {
                user: null,
                errors: errors,
                form: {
                    gmail: "",
                    password: "",
                    loginAs: ""
                }
            });
          }

    }

    else if(loginAs == 2)
    {
        let result = [];
        let errors = [];

        result = await users_query.getAdminByEmail(gmail);

        if (result == undefined) {
            errors.push('No Admin exists with this email');
        } else {
            // Compare the provided password with the hashed password from the database
            bcrypt.compare(password, result.PASSWORD, async (err, passwordMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    res.status(500).send('Internal Server Error');
                } else if (passwordMatch) {
                    console.log('Password Matched for admin!');
                    await authUtils.loginAdmin(res, gmail);
                    res.redirect('/adminHome');
    
                } else {
                    errors.push('Wrong Password');
                    console.log(errors);
                    res.render('login', {
                        user: null,
                        errors: errors,
                        form: {
                            gmail: "",
                            password: "",
                            loginAs: ""
                        }
                    });
                }
            });
        }

        if (errors.length != 0) {
            console.log(errors);

            res.render('login', {
                user: null,
                errors: errors,
                form: {
                    gmail: "",
                    password: "",
                    loginAs: ""
                }
            });
        }
    }

});


module.exports = router;