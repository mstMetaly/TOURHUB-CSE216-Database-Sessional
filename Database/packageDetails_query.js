const oracledb = require('oracledb');

//importing databaseConnect
const { connectToDatabase } = require('./databaseConnect'); 


//return all location according to day and tour id
async function getAllLocationByTourId(tourId)
{
    const connection = await connectToDatabase();

    try{
        const selectSql=`SELECT * FROM LOCATION WHERE TOUR_ID = :tourId`;
        const selectBindings = 
        {
            tourId : tourId
        };

        const result = await connection.execute(selectSql , selectBindings);

        if(result.rows.length === 0)
        {
            console.log("No location found for tour: ",tourId);
            return null;
        }
        else{
            console.log("location for tour id:",tourId, " locaton:",result.rows);
            return result.rows;
        }

    }
    catch(err)
    {
        console.log("package details query te error khacchi!");
        console.log(err);
    }
}

//funtion for fetching location details 
async function getDetailsOfLocation(locationId)
{
    const connection = await connectToDatabase();

    try{
        const selectSql=`SELECT * FROM LOCATION_DETAILS WHERE LOCATION_ID = :locationId`;
        const selectBindings = 
        {
            locationId : locationId
        };

        let result = await connection.execute(selectSql , selectBindings);

        if(result.rows.length === 0)
        {
            console.log("No location details found for tour: ",locationId);
            return null;
        }
        else{
            console.log("location details for location id:",locationId, ":",result.rows);
            return result.rows;
        }

    }
    catch(err)
    {
        console.log(err);
    }
}

//function for fetching comment data
async function getCommentsOfLocation(locationId)
{
    const connection = await connectToDatabase();

    try{
        const selectSql=`SELECT * FROM LOCATION_DETAILS WHERE LOCATION_ID = :locationId`;
        const selectBindings = 
        {
            locationId : locationId
        };

        let result = await connection.execute(selectSql , selectBindings);

        if(result.rows.length === 0)
        {
            console.log("No location details found for tour: ",tourId);
            return null;
        }
        else{
            console.log("location details query te  for location id:",locationId, ":",result.rows);
            return result.rows;
        }

    }
    catch(err)
    {
        console.log(err);
    }
}



module.exports = {getAllLocationByTourId,getDetailsOfLocation,getCommentsOfLocation};