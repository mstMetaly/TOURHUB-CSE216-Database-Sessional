const oracledb = require('oracledb');

const { connectToDatabase } = require('./databaseConnect');


async function insertIntoPackages(tourId, tourName, price, startDate, endDate, totalDay, relativeFilePath) {
    const connection = await connectToDatabase();

    const existingPackageQuery = 'SELECT COUNT(*) AS count FROM PACKAGES WHERE TOUR_ID = :tourId';
    const existingPackageBindings = { tourId };


    const result = await connection.execute(existingPackageQuery, existingPackageBindings);
    const rowCount = result.rows[0].COUNT;

    if (rowCount > 0) {
      console.log("tourId already exist!");
    } else {

    const insertSql = `INSERT INTO PACKAGES(TOUR_ID, TOUR_NAME, PRICE, STARTDATE, ENDDATE, TOTALDAY)
    VALUES (:tourId, :tourName, :price, TO_DATE(:startDate, 'YYYY-MM-DD'), TO_DATE(:endDate, 'YYYY-MM-DD'), :totalDay)`;
    const insertBindings = {
        tourId, tourName, price, startDate, endDate, totalDay
    };

    try {
        await connection.execute(insertSql, insertBindings);
        await connection.commit();

        const plsqlProcedure = `
        CREATE OR REPLACE PROCEDURE INSERT_PACKAGE_IMAGE (
          p_tour_id IN NUMBER,
          p_image_url IN VARCHAR2
        ) IS
        BEGIN
        INSERT INTO PACKAGE_IMAGE(TOUR_ID , IMAGE_URL)
          VALUES (p_tour_id, p_image_url);
          COMMIT;
        END;
      `;

        // Execute the PL/SQL procedure
        await connection.execute(plsqlProcedure);

        await connection.execute(
            `BEGIN
         INSERT_PACKAGE_IMAGE(:tourId, :relativeFilePath);
       END;`,
            {
                tourId,
                relativeFilePath
            }
        );

    }
    catch (err) {
        console.log("packages insert error!", err);
    }

}
}


async function insertFoodImage(tourId, foodDescription, relativeFilePath, foodName) {
    const connection = await connectToDatabase();

    const insertSql = `INSERT INTO PACKAGE_FOOD(TOUR_ID,FOOD_DESCRIPTION,FOOD_IMAGE,FOOD_NAME) VALUES(:tourId,:foodDetails,:foodImage,:foodName)`;
    const insertBindings = {
        tourId: tourId,
        foodDetails: foodDescription,
        foodImage: relativeFilePath,
        foodName: foodName
    };

    try {
        await connection.execute(insertSql, insertBindings);
        await connection.commit();
    }
    catch (err) {
        console.log("food inserted error!", err);
    }


}


//function for insert into Location
async function insertLocation(locationId, locationURL, locationRating, locationDescription, country, tourId, locationName, day, relativeFilePath) {
    const connection = await connectToDatabase();

    try {
        const insertSql = `INSERT INTO LOCATION (LOCATION_ID,LOCATION_URL,LOCATION_REVIEW,LOCATION_DESCRIPTION,COUNTRY_NAME,TOUR_ID,LOCATION_NAME,DAY)
        VALUES(:locationId,:locationURL,:locationRating,:locationDescription,:country,:tourId,:locationName,:day)`;
        const insertBindings = { locationId, locationURL, locationRating, locationDescription, country, tourId, locationName, day };

        await connection.execute(insertSql, insertBindings);
        await connection.commit();

        const plsqlProcedure = `
        CREATE OR REPLACE PROCEDURE INSERT_LOCATION_IMAGE (
          p_location_id IN NUMBER,
          p_image_url IN VARCHAR2
        ) IS
        BEGIN
          INSERT INTO LOCATION_IMAGE(IMAGE_URL,LOCATION_ID)
          VALUES (p_image_url,p_location_id);
          COMMIT;
        END;
      `;

        // Execute the PL/SQL procedure
        await connection.execute(plsqlProcedure);

        // Call the PL/SQL procedure to insert into hotelImage
        await connection.execute(
            `BEGIN
         INSERT_LOCATION_IMAGE(:locationId, :relativeFilePath);
       END;`,
            {
                locationId,
                relativeFilePath
            }
        );

    }
    catch (err) {
        console.log("Location Insert query te error!", err);
    }

}



//function for inserting into locationDescription for a specific location
async function insertLocationDetails(locationId, locationDetails) {
    const connection = await connectToDatabase();

    const insertSql = `INSERT INTO LOCATION_DETAILS(LOCATION_ID,DETAILS) VALUES(:locationId,:details)`;
    const insertBindings = {
        locationId: locationId,
        details: locationDetails
    };

    try {
        await connection.execute(insertSql, insertBindings);
        await connection.commit();
    }
    catch (err) {
        console.log("locationn details query te error!", err);
    }
}


//fuction to insert location details image
async function insertLocationDetailsImage(locationId, relativeFilePath) {
    const connection = await connectToDatabase();

    const insertSql = `INSERT INTO LOCATION_DETAILS_IMAGE(LOCATION_ID,IMAGE_URL) VALUES(:locationId,:filePath)`;
    const insertBindings = {
        locationId: locationId,
        filePath: relativeFilePath
    };

    try {
        await connection.execute(insertSql, insertBindings);
        await connection.commit();
    }
    catch (err) {
        console.log("locationn deatils image insert query te error!", err);
    }
}




//function to insert info in hotel info table and also insert into  hotel image  
async function insertHotel(hotelId, hotelName, budget, tourId, hotelDetails, relativeFilePath) {
    const connection = await connectToDatabase();

    try {
        const insertSql = `INSERT INTO HOTEL_INFO(HOTEL_ID,HOTEL_NAME,BUDGET,TOUR_ID,HOTEL_DETAILS) 
        VALUES(:hotelId,:hotelName,:budget,:tourId,:hotelDetails)`;
        const insertBindings = {
            hotelId, hotelName, budget, tourId, hotelDetails
        };

        await connection.execute(insertSql, insertBindings);
        await connection.commit();

        const plsqlProcedure = `
      CREATE OR REPLACE PROCEDURE INSERT_HOTEL_IMAGE (
        p_hotel_id IN NUMBER,
        p_image_url IN VARCHAR2
      ) IS
      BEGIN
        INSERT INTO HOTEL_IMAGE (HOTEL_ID, IMAGE_URL)
        VALUES (p_hotel_id, p_image_url);
        COMMIT;
      END;
    `;

        // Execute the PL/SQL procedure
        await connection.execute(plsqlProcedure);

        // Call the PL/SQL procedure to insert into hotelImage
        await connection.execute(
            `BEGIN
       INSERT_HOTEL_IMAGE(:hotelId, :relativeFilePath);
     END;`,
            {
                hotelId,
                relativeFilePath
            }
        );

    } catch (err) {
        console.log("Insert hotel info query te error!", err);
    }
}


async function insertHotelRoom(hotelId, roomNo, relativeFilePath, roomDetails) {
    const connection = await connectToDatabase();

    try {
        const plsqlProcedure = `
        CREATE OR REPLACE PROCEDURE INSERT_HOTEL_ROOM (
          p_hotel_id IN NUMBER,
          p_roomNo IN NUMBER,
          p_image_url IN VARCHAR2,
          p_roomDetails IN VARCHAR2

        ) IS
        BEGIN
          INSERT INTO HOTEL_ROOM (HOTEL_ID,ROOM_NO,ROOM_IMAGE,ROOM_DETAILS)
          VALUES (p_hotel_id,p_roomNo, p_image_url,p_roomDetails);
          COMMIT;
        END;
      `;

        // Execute the PL/SQL procedure
        await connection.execute(plsqlProcedure);

        await connection.execute(
            `BEGIN
         INSERT_HOTEL_ROOM(:hotelId,:roomNo,:relativeFilePath,:roomDetails);
       END;`,
            {
                hotelId, roomNo, relativeFilePath, roomDetails
            }
        );


    }
    catch (err) {
        console.log("room image insert query te error!");
    }
}


//function for insertion in description table--instruction and cautions 
async function insertInstructions(tourId, transportDetails, instructions, cautions){
    const connection = await connectToDatabase();
    try{
        const insertSql = `INSERT INTO DESCRIPTION (TOUR_ID,TRANSPORT_DETAILS,DESCRIPTION,CAUTIONS)
        VALUES(:tourId, :transportDetails, :instructions, :cautions)`;
        const insertBindings = {tourId, transportDetails, instructions, cautions};
        await connection.execute(insertSql,insertBindings);
        await connection.commit();

    }catch(err)
    {
        console.log("description query te error!",err);
    }

}


module.exports = {
    insertIntoPackages, insertFoodImage,
    insertLocation, insertLocationDetails,
    insertLocationDetailsImage,
    insertHotel, insertHotelRoom,
    insertInstructions
};