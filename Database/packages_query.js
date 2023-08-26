const oracledb = require('oracledb');

//importing databaseConnect
const { connectToDatabase } = require('./databaseConnect'); 

async function getAllPackages()
{
    const connection = await connectToDatabase();

    try{
        const selectSql = `SELECT * FROM PACKAGES`;

        const result = await connection.execute(selectSql);

        if(result.rows.length === 0)
        {
            console.log("Found no packages!");
            return null;
        }
        else{
            console.log("result for all package:",result.rows);
            return result.rows;
        }

    }
    catch(err)
    {
        console.log(err);
    }

}

module.exports = {getAllPackages};