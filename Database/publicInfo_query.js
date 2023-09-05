const oracledb = require('oracledb');

//importing databaseConnect
const { connectToDatabase } = require('./databaseConnect'); 


async function getProfilePicture(selectSql,selectBindings)
{
    const connection = await connectToDatabase();

    try{
        let result = [];
        result = await connection.execute(selectSql,selectBindings);

        if(result.rows.length === 0)
        {
            return null;
        }
        else{
            console.log("result rows:",result.rows);
            return result.rows[0];
        }

    }
    catch(err)
    {
        console.log("profile pic query te error!",err);
    }
    finally{
        connection.close();
    }
}

module.exports = {getProfilePicture};