const express = require("express");
const bcrypt = require('bcrypt');

const users_query = require('../Database/users_query');
const authUtils = require('../middlewares/auth-utils');
const authentication = require('../middlewares/authentication');

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
    const loginAs = req.body.choice;


    if (loginAs == 1) {

        let result = [], errors = [];

        result = await users_query.getUserByEmail(gmail);
        console.log("login result: ", result);

        if (result == undefined) {
            errors.push('No account found with this gmail');
        }

        else {
            if (password == result.PASSWORD) {
                console.log("Password Matched!");

                await authUtils.loginUser(res, gmail);

                res.redirect('/home');
            }
            else {
                errors.push('Wrong Password');
            }
        }

        if (errors.length != 0) {
            console.log(errors);

            res.render('login',
                {
                    user: null,
                    errors: errors,
                    form:
                    {
                        gmail: "",
                        password: "",
                        loginAs: ""
                    }
                });
        }
        /*else{
            res.redirect('/home');
        }*/


    }

});

module.exports = router;