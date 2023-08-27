//booking info gula tabl  e insert korte hobe
//eikhane function use korbo
const oracledb = require('oracledb');

const {connectToDatabase} = require('../Database/databaseConnect');
const { response } = require('express');

async function insertBookingInfo(insertSql,insertBindings)
{
    const connection = await connectToDatabase();
    try{
        console.log("execute er age bindings:",insertBindings);
        await connection.execute(insertSql,insertBindings);
        await connection.commit();
    }
    catch(err)
    {
        console.log(err);
    }

}

async function insertIntoTourHistory(insertSql,insertBindings)
{
    const connection = await connectToDatabase();
    try{
        await connection.execute(insertSql,insertBindings);
        await connection.commit();
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = {insertBookingInfo,insertIntoTourHistory};