const oracledb = require('oracledb');

//importing databaseConnect
const { connectToDatabase } = require('./databaseConnect'); 


async function insertBlog(selectSql,selectBindings)
{
    const connection = await connectToDatabase();

    try{
        await connection.execute(selectSql,selectBindings);
        await connection.commit();

    }
    catch(err)
    {
        console.log("blog query te error!",err);
    }
}

module.exports = {insertBlog};