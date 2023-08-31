const oracledb = require('oracledb');

//importing databaseConnect
const { connectToDatabase } = require('./databaseConnect'); 


//return all location according to day and tour id
async function getAllHotelByTourId(tourId)
{
    const connection = await connectToDatabase();

    try{
        const selectSql=`SELECT * FROM 
        HOTEL_INFO H JOIN HOTEL_IMAGE I 
        ON (H.HOTEL_ID = I.HOTEL_ID)
        WHERE H.TOUR_ID = :tourId`;
        const selectBindings = 
        {
            tourId : tourId
        };

        const result = await connection.execute(selectSql , selectBindings);

        if(result.rows.length === 0)
        {
            console.log("No hotel found for tour: ",tourId);
            return null;
        }
        else{
            console.log("hotel for tour id:",tourId, " hotel:",result.rows);
            return result.rows;
        }

    }
    catch(err)
    {
        console.log("package details query te error khacchi!");
        console.log(err);
    }
}

async function getAllRoomByHotelId(hotel_Id)
{
    const connection = await connectToDatabase();

    try{
        const selectSql=`SELECT * FROM 
        HOTEL_ROOM WHERE HOTEL_ID = :hotel_id`;

        const selectBindings = 
        {
            hotel_Id : hotel_Id
        };

        const result = await connection.execute(selectSql , selectBindings);

        if(result.rows.length === 0)
        {
            console.log("No hotel room found for tour: ",hotel_Id);
            return null;
        }
        else{
            console.log("hotel room for hotel id:",hotel_Id, " hotel:",result.rows);
            return result.rows;
        }

    }
    catch(err)
    {
        console.log("room query te error khacchi!");
        console.log(err);
    }
}

module.exports =  {getAllHotelByTourId,getAllRoomByHotelId};