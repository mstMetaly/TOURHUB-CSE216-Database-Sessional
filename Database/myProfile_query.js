const oracledb = require('oracledb');

//importing databaseConnect
const { connectToDatabase } = require('./databaseConnect'); 

async function updateMyProfile(selectSql,selectBindings)
{
    const connection = await connectToDatabase();

    try{
       await connection.execute(selectSql,selectBindings);
       await connection.commit();
    }
    catch(err)
    {
        console.log("update profile fucntion e error!",err);
    }
    

}

async function updateProfilePicPath(selectSql,selectBindings)
{
    const connection = await connectToDatabase();

    try{
        await connection.execute(selectSql,selectBindings);
        await connection.commit();
    }
    catch(err)
    {
        console.log("Profile pic change e error",err);
    }
}
module.exports = {updateMyProfile,updateProfilePicPath};