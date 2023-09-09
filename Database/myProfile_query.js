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


async function getPreviousTourHistory(user_id){
    const connection = await connectToDatabase();

    try{
        const selectSql = `SELECT * 
        FROM PACKAGES P JOIN PACKAGE_IMAGE I 
        ON ( P.TOUR_ID = I.TOUR_ID)
        JOIN TOUR_HISTORY  H
        ON(P.TOUR_ID = H.TOUR_ID)
        WHERE H.USER_ID = :user_id
        AND P.ENDDATE < SYSDATE 
            `;

        const selectBindings = {user_id};

        let result = [];
        result = await connection.execute(selectSql,selectBindings);

        /*const selectSql =`SELECT * FROM PACKAGES P JOIN PACKAGE_IMAGE I ON (P.TOUR_ID = I.TOUR_ID)`;
        let result = [];
        result = await connection.execute(selectSql);*/


        if(result.rows.length === 0)
        {
            console.log("no history found");
        }
        else{
            console.log("fetch previous tour history query te",result.rows);
            return result.rows;
        }
    }
    catch(err)
    {
        console.log("previous tour history query te error",err);
    }
}



async function getCurrentTourHistory(user_id){

    const connection = await connectToDatabase();

    try{
        const selectSql = `SELECT * 
        FROM PACKAGES P JOIN PACKAGE_IMAGE I 
        ON ( P.TOUR_ID = I.TOUR_ID)
        JOIN TOUR_HISTORY  H
        ON(P.TOUR_ID = H.TOUR_ID)
        WHERE H.USER_ID = :user_id
        AND P.ENDDATE > SYSDATE 
            `;

        const selectBindings = {user_id};

        let result = [];
        result = await connection.execute(selectSql,selectBindings);

        if(result.rows.length === 0)
        {
            console.log("no history found");
        }
        else{
            console.log("fetch previous tour history query te",result.rows);
            return result.rows;
        }
    }
    catch(err)
    {
        console.log("previous tour history query te error",err);
    }
}


//function for insertion cancel request 
async function insertCancelRequest(user_id,booking_id){
    const connection = await connectToDatabase();

    try{
        const insertSql = `INSERT INTO CANCELLATION_INFO(BOOKING_ID,USER_ID) VALUES(:booking_id,:user_id)`;
        const insertBindings = {
            booking_id : booking_id,
            user_id : user_id
        };

        await connection.execute(insertSql,insertBindings);
        await connection.commit();
    }
    catch(err)
    {
        console.log("cancel reqquest insertion query te error!",err);
    }
}

module.exports = {updateMyProfile,updateProfilePicPath,getPreviousTourHistory,getCurrentTourHistory,insertCancelRequest};