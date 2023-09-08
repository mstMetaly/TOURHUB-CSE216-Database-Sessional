const oracledb = require('oracledb');

const { connectToDatabase } = require('../Database/databaseConnect');


//function for insertion in BookingInfo table and others 3 table
async function insertBookingInfo(bookingId, user_id, full_name, phone_no, maleCount, femaleCount, childCount, totalCount, transactionNo, bkash_no, paymentDate, totalAmount, tourId) {
    const connection = await connectToDatabase();
    try {
        const insertSql = `INSERT INTO BOOKING_INFO(BOOKING_ID,USER_ID,FULL_NAME,PHONE_NO,MALE_COUNT,FEMALE_COUNT,CHILD_COUNT,TOTAL_COUNT,TRANSACTION_NO)
        VALUES(:bookingId,:user_id,:full_name,:phone_no,:maleCount,:femaleCount,:childCount,:totalCount,:transactionNo)`;
        const insertBindings = { bookingId, user_id, full_name, phone_no, maleCount, femaleCount, childCount, totalCount, transactionNo };

        await connection.execute(insertSql, insertBindings);
        await connection.commit();

        let p_time = paymentDate;

        console.log("all data:");
        console.log(user_id, bookingId, transactionNo, bkash_no,paymentDate,totalAmount,p_time,tourId);

       

        await connection.execute(
            `BEGIN
            BOOKING_INSERTION (
                :user_id,
                :bookingId,
                :transactionNo,
                :bkash_no,
                :totalAmount,
                :tourId);
            END;`,
            {
                user_id, bookingId, transactionNo, bkash_no,totalAmount,tourId
            }
        );

    }
    catch (err) {
        console.log(err);
    }

}


//function for getting bookingInfo
async function getBookingInfo(bookingId) {
    const connection = await connectToDatabase();

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