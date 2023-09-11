const oracledb = require('oracledb');

//importing databaseConnect
const { connectToDatabase } = require('./databaseConnect');

async function getAllPackages() {
    const connection = await connectToDatabase();

    try {
        const selectSql = `SELECT * FROM PACKAGES P JOIN PACKAGE_IMAGE G ON P.TOUR_ID = G.TOUR_ID WHERE STARTDATE > SYSDATE`;

        const result = await connection.execute(selectSql);

        if (result.rows.length === 0) {
            console.log("Found no packages!");
            return null;
        }
        else {
            console.log("result for all package:", result.rows);
            return result.rows;
        }

    }
    catch (err) {
        console.log("package query te error!");
        console.log(err);
    }

}

async function getAllReview() {
    const connection = await connectToDatabase();

    try {
        const selectSql = `SELECT * FROM PACKAGE_REVIEW P JOIN PUBLIC_INFO I ON P.USER_NAME = I.USER_NAME`;

        const result = await connection.execute(selectSql);

        if (result.rows.length === 0) {
            return null;
        }
        else {
            console.log("query te review:", result.rows);
            return result.rows;
        }

    }
    catch (err) {
        console.log(err);
    }
}



///get filtered packages 
async function getFilteredPackages(location, date) {
    // date = decodeURIComponent(req.query.date);
    // location = decodeURIComponent(req.query.location);
    console.log("getting location in function :", location, " date:", date);
    const connection = await connectToDatabase();
    let result = [];
    try {

        if (date && location) {
            const selectSql = `
        SELECT *
        FROM PACKAGES P JOIN PACKAGE_IMAGE I 
        ON (P.TOUR_ID = I.TOUR_ID)
        WHERE TOUR_NAME IN 
        (SELECT TOUR_NAME
        FROM PACKAGES 
        WHERE LOWER(TOUR_NAME) LIKE LOWER('%' || :location || '%')
        )

        
        INTERSECT
    
        SELECT *
        FROM PACKAGES P JOIN PACKAGE_IMAGE I 
        ON (P.TOUR_ID = I.TOUR_ID)
        WHERE TO_TIMESTAMP(:dateUrl, 'YYYY-MM-DD HH24:MI:SS')  BETWEEN SYSDATE AND P.ENDDATE
    `;



            const selectBindings = {
                location: location, // Add % around location if you want to perform a partial match
                dateUrl: date // No need to format date here, leave it as is
            };
            result.length = 0;
            result = await connection.execute(selectSql, selectBindings);
        }

        else if (location) {
            const selectSql = `
            SELECT *
            FROM PACKAGES P JOIN PACKAGE_IMAGE I 
            ON (P.TOUR_ID = I.TOUR_ID)
            WHERE TOUR_NAME IN 
            (SELECT TOUR_NAME
            FROM PACKAGES 
            WHERE LOWER(TOUR_NAME) LIKE LOWER('%' || :location || '%')
            )`;
            const selectBindings = {
                location: location, // Add % around location if you want to perform a partial match
            };
            result.length = 0;
            result = await connection.execute(selectSql, selectBindings);

        }
        else if (date) {
            const selectSql = ` SELECT *
            FROM PACKAGES P JOIN PACKAGE_IMAGE I 
            ON (P.TOUR_ID = I.TOUR_ID)
            WHERE TO_TIMESTAMP(:dateUrl, 'YYYY-MM-DD HH24:MI:SS')  BETWEEN SYSDATE AND P.ENDDATE`;

            const selectBindings = {
                dateUrl: date// Add % around location if you want to perform a partial match
            };
            result.length = 0;
            result = await connection.execute(selectSql, selectBindings);
        }


        if (result.rows.length === 0) {
            console.log("Found no packages filtered!");
            return null;
        }
        else {
            console.log("result for all search package:", result.rows);
            return result.rows;
        }



    } catch (err) {
        console.log("location : ", location, " ,date:", date);
        console.log("Filtered packages query e error", err);
    }


}

module.exports = { getAllPackages, getAllReview, getFilteredPackages };