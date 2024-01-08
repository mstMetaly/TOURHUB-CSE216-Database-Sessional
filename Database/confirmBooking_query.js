
const { connectToDatabase } = require('../Database/databaseConnect');


//function for insertion in BookingInfo table and others 3 table
async function insertBookingInfo(bookingId, user_id, full_name, phone_no, totalCount, totalAmount, tourId) {
    const connection = await connectToDatabase();
    try {
        const insertSql = `INSERT INTO BOOKING_INFO(BOOKING_ID,USER_ID,FULL_NAME,PHONE_NO,TOTAL_COUNT,TOTAL_AMOUNT,TOUR_ID)
        VALUES(:bookingId,:user_id,:full_name,:phone_no,:totalCount,:totalAmount,:tourId)`;
        const insertBindings = { bookingId, user_id, full_name, phone_no,totalCount,totalAmount,tourId};

        await connection.execute(insertSql, insertBindings);
        await connection.commit();

        //let p_time = paymentDate;

        //console.log("all data:");
       // console.log(user_id, bookingId, transactionNo, bkash_no,paymentDate,totalAmount,p_time,tourId);

       const insertSql2 = `INSERT INTO TOUR_HISTORY(USER_ID, TOUR_ID, BOOKING_ID) VALUES(:user_id, :tour_id, :booking_id)`;
       const insertBindings2 = { 
        user_id: user_id, 
        tour_id: tourId,
         booking_id: bookingId 
        };


       console.log("Before executing TOUR_HISTORY insert query");
       await connection.execute(insertSql2, insertBindings2);
       await connection.commit();
       console.log("after executing TOUR_HISTORY insert query");

      /*await connection.execute(
            `BEGIN
            BOOKING_INSERTION (
                :user_id,
                :bookingId,
                :totalAmount,
                :tourId);
            END;`,
            {
                user_id, bookingId,totalAmount,tourId
            }
        );
        await connection.commit();*/

    }
    catch (err) {
        console.log(err);
    }

}


//function for getting bookingInfo
async function getBookingInfo(bookingId) {

    try {
        const connection = await connectToDatabase();

        const insertSql = `SELECT * FROM BOOKING_INFO WHERE BOOKING_ID = :bookingId`;
        const insertBindings = {
            bookingId: bookingId
        };

        const result = await connection.execute(insertSql, insertBindings);
        return result.rows[0];
    }
    catch (err) {
        console.log(err);

    }
}

module.exports = { insertBookingInfo, getBookingInfo };