const oracledb = require('oracledb');

//importing databaseConnect
const { connectToDatabase } = require('./databaseConnect'); 

async function getAllGallery(selectSql)
{
    try{
        const connection = await connectToDatabase();
        const result = await connection.execute(selectSql);

        if(result.rows.length === 0)
        {
            return null;
        }
        else{
            console.log("gallery query te :",result.rows);
            return result.rows;
        }
    }
    catch(err)
    {
        console.log("gallery query te error!",err);
    }
}

module.exports = {getAllGallery};