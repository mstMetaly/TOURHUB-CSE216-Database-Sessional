const oracledb = require('oracledb');

const {connectToDatabase} = require('./databaseConnect');

//all admin home query--
async function admin_getAllUser()
{
    const connection = await connectToDatabase();

    try{
        const selectSql = `SELECT *
        FROM TOUR_HISTORY T JOIN BOOKING_INFO B 
        ON T.BOOKING_ID = B.BOOKING_ID
        `;
        const result = await connection.execute(selectSql);

        if(result.rows.length === 0)
        {
            console.log("no tourist found");
            return null;
        }
        else{
            return result.rows;
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

//get all packages with total tourist in that package

async function admin_getAllPackages()
{
    const connection = await connectToDatabase();
    try{
        const selectSql = `SELECT * FROM PACKAGES`;
        
        const result = await connection.execute(selectSql);

        if(result.rows.length === 0)
        {
            console.log("no packages found to show in admin page");
            return null;
        }
        else{
            return result.rows;
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = {admin_getAllUser,admin_getAllPackages};