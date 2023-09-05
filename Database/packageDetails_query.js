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
//getAllFood by tourId
async function getAllFood(tourId)
{
    const connection = await connectToDatabase();

    try{
        const selectSql=`SELECT * FROM PACKAGE_FOOD WHERE TOUR_ID = :tourId`;
        const selectBindings = 
        {
            tourId : tourId
        };

        const result = await connection.execute(selectSql , selectBindings);

        if(result.rows.length === 0)
        {
            console.log("No food found for tour: ",tourId);
            return null;
        }
        else{
            console.log("food for tour id:",tourId, " locaton:",result.rows);
            return result.rows;
        }

    }catch(err)
    {
        console.log(err);
    }
}
//others---
async function getAllOthers(tourId)
{
    const connection = await connectToDatabase();

    try{
        const selectSql=`SELECT * FROM DESCRIPTION WHERE TOUR_ID = :tourId`;
        const selectBindings = 
        {
            tourId : tourId
        };

        const result = await connection.execute(selectSql , selectBindings);

        if(result.rows.length === 0)
        {
            console.log("No others found for tour: ",tourId);
            return null;
        }
        else{
            console.log("others in query for tour id:",tourId, " others:",result.rows);
            return result.rows;
        }

    }catch(err)
    {
        console.log(err);
    }

}



//query for seeMore page from package details---------
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
        const selectSql=`SELECT * FROM LOCATION_COMMENTS WHERE LOCATION_ID = :locationId`;
        const selectBindings = 
        {
            locationId : locationId
        };

        let result = await connection.execute(selectSql , selectBindings);

        if(result.rows.length === 0)
        {
            console.log("No location comments found for tour: ",tourId);
            return null;
        }
        else{
            console.log("location comments  query te  for location id:",locationId, ":",result.rows);
            return result.rows;
        }

    }
    catch(err)
    {
        console.log(err);
    }
}

async function insertComment(insertSql,insertBindings)
{
    console.log("Inserting comment:", insertSql, insertBindings);
    console.log("insert e:",insertSql,insertBindings);

    try{
        const connection = await connectToDatabase();
        await connection.execute(insertSql,insertBindings);
        await connection.commit();
        console.log("commited");
    }
    catch(err)
    {
        console.log("comment insert e error!");
    }
}


module.exports = {getAllLocationByTourId,getDetailsOfLocation,getCommentsOfLocation,getAllFood,getAllOthers,insertComment};