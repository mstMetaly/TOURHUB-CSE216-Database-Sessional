const express = require('express');
const multer = require('multer');
const path = require('path');

const addPackage_query = require('../../Database/addPackage_query');

const router = express.Router();

// Configure Multer to handle file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/image/hotel_image'); // Change the destination folder accordingly
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, uniqueSuffix + fileExtension);
    },
});

const upload = multer({ storage: storage });

// POST request to insert hotel information
router.post('/addHotel', upload.single('hotelImage'), (req, res) => {
    // Get form data from request body
    const formData = req.body;
    const hotelId = formData.hotelId;
    const hotelName = formData.hotelName;
    const budget = formData.budget;
    const tourId = formData.tourId;
    const hotelDetails = formData.hotelDetails;

    try{
        const relativeFilePath = path.relative('Public', req.file.path);
        addPackage_query.insertHotel(hotelId,hotelName,budget,tourId,hotelDetails,relativeFilePath);
        res.redirect('/addNewPackage');
    }catch(err)
    {
        console.log(err);
    }


});



//addHotelRoom image and details 
const roomStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'Public/image/room_image');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  const roomImageUpload = multer({ storage: roomStorage });


  router.post('/addHotelRoom', roomImageUpload.single('roomImage'), async (req, res) => {
    // Extract data from the request body
    const { hotelId, roomNo, roomDetails } = req.body;
    // Extract the relative file path of the uploaded image
    const relativeFilePath = path.relative('Public', req.file.path);

    addPackage_query.insertHotelRoom(hotelId,roomNo,relativeFilePath,roomDetails);
    res.redirect('/addNewPackage');

  });
  

module.exports = router;
