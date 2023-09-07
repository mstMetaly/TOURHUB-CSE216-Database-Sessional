const oracledb=require('oracledb');

//importing databaseConnect
const { connectToDatabase } = require('./databaseConnect');

oracledb.outFormat=oracledb.OUT_FORMAT_OBJECT;


//insert new user into database when new user registered
async function insertUser(user_id, username, gmail, password) {
    const connection=await connectToDatabase();

    try {
        
        const insertSql = `
        INSERT INTO USERS (USER_ID, USERNAME, GMAIL, PASSWORD) VALUES (:user_id, :username, :gmail, :password)`;
        const insertBindings = {
    
            user_id:user_id,
            username: username,
            gmail: gmail,
            password: password
        };
    
        await connection.execute(insertSql, insertBindings);
        await connection.commit();

        console.log("User inserted");

    } catch (err) {
        console.error(err);
    }
}

//Get User By Username
async function getUserByUsername(username)
{
    const connection=await connectToDatabase();

    try{
        const selectSql=`SELECT * FROM USERS WHERE USERNAME = :username`;
        const selectBindings= [username];

        const result = await connection.execute(selectSql,selectBindings);

        if (result.rows.length === 0) {
            console.log("Found no user");
            return null; // User not found
        }

        console.log("GetUsernameResult:", result.rows);

        return result.rows[0];

    }
    catch(err)
    {
        console.log(err);
    }
}

//Get User By Email
async function getUserByEmail(gmail) {
    const connection=await connectToDatabase();
    try {
        const selectSql = `SELECT * FROM USERS WHERE GMAIL = :gmail`;
        const selectBindings = [gmail];

        const result = await connection.execute(selectSql, selectBindings);

        if (result.rows.length === 0) {
            console.log("Found no user");
            return null; // User not found
        }
        
        console.log("GetGmailResult:", result.rows);

        return result.rows[0];

    } catch (err) {
        console.error(err);
    }
}

//get user profile info using gamil
async function getUserProfileInfo(gmail) {
    const connection=await connectToDatabase();
    try {
        const selectSql = `SELECT * FROM USER_PROFILE_INFO WHERE GMAIL = :gmail`;
        const selectBindings = [gmail];

        const result = await connection.execute(selectSql, selectBindings);

        if (result.rows.length === 0) {
            console.log("Found no user");
            return null; // User not found
        }
        
        console.log("GetGmailResult:", result.rows);

        return result.rows[0];

    } catch (err) {
        console.error(err);
    }
}

//get admin using gmail
async function getAdminByEmail(gmail)
{
    const connection = await connectToDatabase();

    try{
        const selectSql = `SELECT * FROM ADMIN WHERE GMAIL =:gmail`;
        const selectBindings =[gmail];

        const result = await connection.execute(selectSql , selectBindings);

        if(result.rows.length === 0)
        {
            console.log("Found no admin");
            return null;
        }
        else{
            return result.rows[0];
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports={insertUser,getUserByUsername,getUserByEmail,getAdminByEmail,getUserProfileInfo};


