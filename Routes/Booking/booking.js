const express = require('express');
const pdfkit = require('pdfkit');

//importing confirmBooking_query
const confirmBooking_query = require('../../Database/confirmBooking_query');


const router = express.Router();

//routes for rendering bookingPage
router.get('/booking/:tourId', async (req, res) => {
    if (req.user == null) {
        res.redirect('/login');
    }
    else {
        const tourId = req.params.tourId;
        res.render('booking', { tourId });
    }
});

//routes for selectHotel-render selectHotel page
router.get('/selectHotel', async (req, res) => {
    if (req.user == null) {
        res.redirect('/login');
    }
    else {
        res.render('selectHotel');
    }
});

//routes for booking confirmation
router.post('/confirmBooking/:tourId', async (req, res) => {
    if (req.user == null) {
        res.redirect('/login');
    }
    else {
        //confirmForm contains the formData that have been sent from the browser

        // Parse the values as numbers
        const maleCount = parseInt(req.body.male_count);
        const femaleCount = parseInt(req.body.female_count);
        const childCount = parseInt(req.body.child_count);

        const totalCount = maleCount + femaleCount;

        const insertSql = `INSERT INTO BOOKING_INFO VALUES 
        (:booking_id,:user_id,:hotel_id,:payment_id,:full_name,:phone_no,:male_count,:female_count,:child_count,:total_count)`;

        const insertBindings =
        {
            booking_id: Date.now().toString(),
            user_id: req.user.user_id,
            hotel_id: 1,
            payment_id: 1,
            full_name: req.body.full_name,
            phone_no: req.body.phone_no,
            male_count: req.body.male_count,
            female_count: req.body.female_count,
            child_count: req.body.child_count,
            total_count: totalCount
        }

        console.log("function call er age bindings:", insertBindings);

        //insert booking info into BOOKING_INFO table
        confirmBooking_query.insertBookingInfo(insertSql, insertBindings);

        //get the tourId
        const tour_Id = req.params.tourId;

        //insert USER_ID and TOUR_ID into TOUR_HISTORY table

        const insertSql2 = `INSERT INTO TOUR_HISTORY VALUES (:user_id,:tour_id,:booking_id)`;
        const insertBindings2 = {
            user_id: req.user.user_id,
            tour_id: tour_Id,
            booking_id: insertBindings.booking_id
        };

        confirmBooking_query.insertIntoTourHistory(insertSql2, insertBindings2);


        const bookingId = insertBindings.booking_id;

        res.redirect(`/confirmation?booking_id=${bookingId}`);

    }

});

//routers for rendering confirmation page 
router.get('/confirmation', async (req, res) => {
    if (req.user == null) {
        res.redirect('/login');
    }
    else {
        const bookingId = req.query.booking_id;

        res.render('confirmation', { bookingId });
    }
});


//routes for confirmationInfo -- for confimation Page
router.get('/confirmationInfo/:bookingId', async (req, res) => {
    if (req.user == null) {
        res.redirect('/login');
    }
    else {
        const bookingId = req.params.bookingId;

        console.log("booking.js e bookingId:", bookingId);

        let result = await confirmBooking_query.getBookingInfo(bookingId);

        if (result == undefined) {
            console.log("No booking info");
            return null;
        }
        else {
            console.log(result);
            return res.json(result);
        }

    }
});

//route for downloading the confirmation pdf
router.get('/download/:bookingId', async (req, res) => {
    if (req.user == null) {
        res.redirect('/login');
    }
    else {
        const bookingId = req.params.bookingId;
        //get the booking info 
        const result = await confirmBooking_query.getBookingInfo(bookingId);

        const pdfDoc = new pdfkit();
        // Pipe the PDF content to the response stream
        pdfDoc.pipe(res);

        pdfDoc.text('Booking Information:', 50, 50);
        pdfDoc.text(`Booking ID: ${result.BOOKING_ID}`);
        pdfDoc.text(`Name: ${result.FULL_NAME}`);
        pdfDoc.text(`Hotel ID: ${result.HOTEL_ID}`);
        pdfDoc.text(`Payment ID: ${result.PAYMENT_ID}`);


        // Set response headers for PDF download
        res.setHeader('Content-Disposition', 'attachment; filename="booking_info.pdf"');
        res.setHeader('Content-Type', 'application/pdf');


        pdfDoc.end();
    }
});



module.exports = router;
