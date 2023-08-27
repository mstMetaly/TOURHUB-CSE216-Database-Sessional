const oracledb=require('oracledb');

//importing databaseConnect
const { connectToDatabase } = require('./databaseConnect'); 

oracledb.outFormat=oracledb.OUT_FORMAT_OBJECT;


//insert new user into database when new user registered
async function insertUser(insertSql,insertBindings) {
    const connection=await connectToDatabase();

    try {
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

module.exports={insertUser,getUserByUsername,getUserByEmail,getAdminByEmail};


