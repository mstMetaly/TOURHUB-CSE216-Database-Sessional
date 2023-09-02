const oracledb = require('oracledb');

//importing databaseConnect
const { connectToDatabase } = require('./databaseConnect'); 


async function insertFAQ(selectSql,selectBindings)
{
    const connection = await connectToDatabase();

    try{
        await connection.execute(selectSql,selectBindings);
        await connection.commit();

    }
    catch(err)
    {
        console.log("faq query te error!",err);
    }
}

module.exports = {insertFAQ};