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

async function getAllReview()
{
    const connection = await connectToDatabase();

    try{
        const selectSql = `SELECT * FROM PACKAGE_REVIEW P JOIN PUBLIC_INFO I ON P.USER_NAME = I.USER_NAME`;

        const result = await connection.execute(selectSql);

        if(result.rows.length === 0)
        {
            return null;
        }
        else{
            console.log("query te review:",result.rows);
            return result.rows;
        }

    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = {getAllPackages,getAllReview};