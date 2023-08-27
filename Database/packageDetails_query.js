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

module.exports = {getAllLocationByTourId};