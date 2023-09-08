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




//routes for booking confirmation
router.post('/confirmBooking/:tourId', async (req, res) => {
    if (req.user == null) {
        res.redirect('/login');
    }
    else {

        const tourId = req.params.tourId;
        //confirmForm contains the formData that have been sent from the browser
        const bookingId = Date.now().toString();
        const user_id = req.user.user_id;
        const full_name = req.body.full_name;
        const phone_no = req.body.phone_no;
        const maleCount = parseInt(req.body.male_count);
        const femaleCount = parseInt(req.body.female_count);
        const childCount = parseInt(req.body.child_count);
        const totalCount = maleCount + femaleCount;

        const transactionNo = req.body.transactionNo;
        const bkash_no = req.body.bkash_no;
        const paymentDate = req.body.paymentDate;
        const totalAmount = parseInt(req.body.totalAmount);


        //insert booking info into BOOKING_INFO table
        confirmBooking_query.insertBookingInfo(bookingId,user_id,full_name,phone_no,maleCount,femaleCount,childCount,totalCount,transactionNo,bkash_no,paymentDate,totalAmount,tourId);

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
