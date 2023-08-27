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

                }
               else{
                console.log("result null noi");

                    req.user = {
                        user_id  : result.USER_ID,
                        gmail : decoded.mail,
                        username : result.USERNAME
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

async function adminAuth(req ,res ,next)
{
    req.admin = null;
    if(req.cookies.adminSessionToken)
    {
        let token = req.cookies.adminSessionToken;

        //verified toekn was made by server 
        jwt.verify(token ,process.env.APP_SECRET,async (err ,decoded)=>{
            if(err)
            {
                console.log("Error at verifying admin");
                next();
            }
            else{
                const decodedGmail = decoded.mail;

                let result =null;
                result= await users_query.getAdminByEmail(decodedGmail);

                if(result == null)
                {
                    console.log("result null admin authentication  e");

                }
                else{
                    req.admin = {
                        user_id  : result.ADMIN_ID,
                        gmail : decoded.mail
                    }
                }
                next();

            }
            
        });
    }
    else{
        next();
    }
}

module.exports = {auth,adminAuth};
