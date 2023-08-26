require('dotenv').config();

const jwt= require('jsonwebtoken');
const databaseConnect = require('../Database/databaseConnect');
const users_query = require('../Database/users_query');

async function auth(req,res,next)
{
    req.user = null;

    if(req.cookies.sessionToken)
    {
        let token = req.cookies.sessionToken;

        //verify token was made by server

        jwt.verify(token, process.env.APP_SECRET, async (err , decoded ) =>{
            if(err)
            {
                console.log("Error at verifying token: "+ err.message);
                next();
            }
            else{

                console.log("decoded obj:",decoded);

                const decodedGmail = decoded.mail;

                let result =null;
                result= await users_query.getUserByEmail(decodedGmail);

                if(result == null)
                {
                    console.log("result null e authentication  e");

                    /*req.user = {
                        user_id  : decoded.user_id,
                        gmail : decoded.gmail,
                        username : decoded.username
                    }

                    console.log("req user:",req.user);*/

                }
               else{
                console.log("result null noi");

                    let time = new  Date();

                    req.user = {
                        user_id  : decoded.user_id,
                        gmail : decoded.mail,
                        username : decoded.username
                    }
                   
                    console.log("req user:",req.user);
                }

                next();
            }

        });
    }

    else{
        next();
    }

}

module.exports = {auth};
