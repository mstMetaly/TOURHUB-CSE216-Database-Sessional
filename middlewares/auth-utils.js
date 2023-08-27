const jwt = require('jsonwebtoken');

const users_query= require('../Database/users_query');

async function loginUser(res , gmail)
{
    const payload = {
        mail : gmail
    }

    //let  token = jwt.sign(payload , process.env.APP_SECRET , {expiresIn : "200s"});
    let  token = jwt.sign(payload , process.env.APP_SECRET );

    console.log("token:",token);
    
    let options = {
        maxAge: 90000000, 
        httpOnly: true
    }

    res.cookie('sessionToken', token, options);
}

async function loginAdmin(res ,gmail)
{
    const payload = {
        mail : gmail
    }

    let  token = jwt.sign(payload , process.env.APP_SECRET );

    let options = {
        maxAge: 90000000, 
        httpOnly: true
    }

    res.cookie('adminSessionToken', token, options);

}

module.exports = {
    loginUser,
    loginAdmin
}