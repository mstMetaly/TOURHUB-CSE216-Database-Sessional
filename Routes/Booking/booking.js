const express = require('express');
const pdfkit = require('pdfkit');

//payment gateway

const SSLCommerzPayment = require('sslcommerz-lts');
const store_id = 'proje6543e05e06bbd';
const store_passwd = 'proje6543e05e06bbd@ssl';
const is_live = false; //true for live, false for sandbox

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


//sslcommerz init
router.post('/confirmBooking/:tourId', (req, res) => {
    const tourId = req.params.tourId;
    const full_name = req.body.full_name;
    const phone_no = req.body.phone_no;
    const totalCount = req.body.total_count;
    const totalAmount = parseInt(req.body.total_amount);

    console.log("ssl e total count:",totalCount , "  total amount:",totalAmount);

    const data = {
        total_amount: req.body.total_amount,
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: `http://localhost:3000/success/${tourId}?full_name=${full_name}&phone_no=${phone_no}&totalCount=${totalCount}&totalAmount=${totalAmount}`,
        fail_url: 'http://localhost:3000/fail',
        cancel_url: 'http://localhost:3000/cancel',
        ipn_url: 'http://localhost:3000/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL
        res.redirect(GatewayPageURL)
        console.log('Redirecting to: ', GatewayPageURL)
    });
});


router.post('/success/:tourId', (req, res) => {
    // Handle success action here for POST request
    // This is where SSLCommerz may send POST data
    // You can access POST data using req.body
    // Example: const postData = req.body;
    // Perform actions based on the POST data
    const tourId = req.params.tourId;
    const full_name = req.query.full_name;
    const phone_no = req.query.phone_no;
    const totalCount = req.query.totalCount;
    const totalAmount = parseInt(req.query.totalAmount);

    console.log(req.body);
    res.redirect(`/confirmBooking/${tourId}?full_name=${full_name}&phone_no=${phone_no}&totalCount=${totalCount}&totalAmount=${totalAmount}`);

});



//routes for booking confirmation
router.get('/confirmBooking/:tourId', async (req, res) => {
    if (req.user == null) {
        res.redirect('/login');
    }
    else {

        const tourId = req.params.tourId;
        //confirmForm contains the formData that have been sent from the browser
        const bookingId = Date.now().toString();
        const user_id = req.user.user_id;
        const full_name = req.query.full_name;
        const phone_no = req.query.phone_no;
        const totalCount = req.query.totalCount;
        const totalAmount = parseInt(req.query.totalAmount);

        //insert booking info into BOOKING_INFO table
        await confirmBooking_query.insertBookingInfo(bookingId, user_id, full_name, phone_no, totalCount, totalAmount, tourId);

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
