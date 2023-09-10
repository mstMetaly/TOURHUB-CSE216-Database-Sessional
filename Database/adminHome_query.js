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

//gettting all cancel request 
async function getAllCancelRequest(){
    const connection = await connectToDatabase();

    try{
        const selectSql = `SELECT C.BOOKING_ID,P.NAME,P.TID
        FROM CANCELLATION_INFO C,
        (SELECT B.BOOKING_ID AS BOOK , B.FULL_NAME AS NAME , T.TOUR_ID AS TID
        FROM BOOKING_INFO B JOIN TOUR_HISTORY T 
        ON B.BOOKING_ID =  T.BOOKING_ID
        )P
        WHERE C.BOOKING_ID= P.BOOK
        `;

        let result = [];
        result = await connection.execute(selectSql);

        if(result.rows.length === 0)
        {
            return null;
        }
        else{
            console.log("cancel request query te",result.rows);
            return result.rows;
        }
    }
    catch(err)
    {
        console.log("cancel request query te error!",err);
    }
}


async function confirmCancelRequest(booking_id)
{
    const connection = await connectToDatabase();

    try{
        const deleteSql1 = `DELETE FROM TOUR_HISTORY WHERE BOOKING_ID = :booking_id`;
        const deleteSql2 = ` DELETE FROM CANCELLATION_INFO WHERE BOOKING_ID = :booking_id`;
        const deleteSql3 = `DELETE FROM  BOOKING_INFO WHERE BOOKING_ID = :booking_id`;

        const deleteBindings = {booking_id};
        await connection.execute(deleteSql1,deleteBindings);
        await connection.commit();

        await connection.execute(deleteSql2,deleteBindings);
        await connection.commit();

        await connection.execute(deleteSql3,deleteBindings);
        await connection.commit();

    }catch(err)
    {
        console.log("confirm cancel request query te error!",err);
    }
}

//get all faq request 
async function getAllFAQRequest()
{
    const connection = await connectToDatabase();

    try{
        const selectSql = `SELECT * FROM FAQ ORDER BY TIME`;

        let result = [];
        result = await connection.execute(selectSql);

        if(result.rows.length === 0)
        {
            return null;
        }
        else{
            console.log("faq request query te",result.rows);
            return result.rows;
        }
    
    }catch(err)
    {
        console.log("faq query te error!",err);
    }
}

//get all log request 
async function getAllLogRequest()
{
    const connection = await connectToDatabase();

    try{
        const selectSql = `SELECT * FROM LOG_TABLE ORDER BY TIME`;

        let result = [];
        result = await connection.execute(selectSql);

        if(result.rows.length === 0)
        {
            return null;
        }
        else{
            console.log("log request query te",result.rows);
            return result.rows;
        }
    }
    catch(err)
    {
        console.log("log query te err",err);
    }
}


module.exports = {admin_getAllUser,admin_getAllPackages,getAllCancelRequest,confirmCancelRequest,getAllFAQRequest,getAllLogRequest};