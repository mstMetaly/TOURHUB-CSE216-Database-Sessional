const oracledb = require('oracledb');

//importing databaseConnect
const { connectToDatabase } = require('./databaseConnect');

async function getAllPackages() {
    const connection = await connectToDatabase();

    try {
        const selectSql = `SELECT * FROM PACKAGES P JOIN PACKAGE_IMAGE G ON P.TOUR_ID = G.TOUR_ID`;

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
    console.log("getting location in function :",location ," date:",date);
    const connection = await connectToDatabase();

    try {
            /*const selectSql = `SELECT * 
            FROM PACKAGES P JOIN PACKAGE_IMAGE G 
            ON P.TOUR_ID = G.TOUR_ID
            WHERE LOWER(P.TOUR_NAME) LIKE '%sajek%'
            `;
    */
        /*
           const selectSql = `
            SELECT *
            FROM PACKAGES P JOIN PACKAGE_IMAGE I 
            ON (P.TOUR_ID = I.TOUR_ID)
            WHERE TOUR_NAME IN 
            (SELECT TOUR_NAME
            FROM PACKAGES 
            WHERE LOWER(TOUR_NAME) LIKE ('%:location%')
            )
            
            UNION
            
            SELECT *
            FROM PACKAGES P JOIN PACKAGE_IMAGE I 
            ON (P.TOUR_ID = I.TOUR_ID)
            WHERE :date BETWEEN TO_CHAR(STARTDATE, 'DD-MM-YYYY') AND 
             TO_CHAR(ENDDATE, 'DD-MM-YYYY')
            `;
        
       
        const selectBindings = {
            location: location,
            date : date

        };*/
    const selectSql = `
    SELECT *
    FROM PACKAGES P JOIN PACKAGE_IMAGE I 
    ON (P.TOUR_ID = I.TOUR_ID)
    WHERE TOUR_NAME IN 
    (SELECT TOUR_NAME
    FROM PACKAGES 
    WHERE LOWER(TOUR_NAME) LIKE :location
    )
    
    UNION
    
    SELECT *
    FROM PACKAGES P JOIN PACKAGE_IMAGE I 
    ON (P.TOUR_ID = I.TOUR_ID)
    WHERE TO_DATE(:date, 'DD-MM-YYYY') BETWEEN STARTDATE AND ENDDATE
`;
const selectBindings = {
    location: `%${location}%`, // Add % around location if you want to perform a partial match
    date: date // No need to format date here, leave it as is
};


        const result = await connection.execute(selectSql,selectBindings);

        if (result.rows.length === 0) {
            console.log("Found no packages filtered!");
            return null;
        }
        else {
            console.log("result for all search package:", result.rows);
            return result.rows;
        }
    } catch (err) {
        console.log("location : ",location ," ,date:",date);
        console.log("Filtered packages e error", err);
    }

}

module.exports = { getAllPackages, getAllReview, getFilteredPackages };