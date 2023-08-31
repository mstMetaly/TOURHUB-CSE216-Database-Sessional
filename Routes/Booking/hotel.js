const express = require('express');

const hotel_query = require('../../Database/hotel_query');

const router = express.Router();

//router for rendering hotel
router.get('/hotel/:tourId',async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        const tourId = req.params.tourId;
        res.render('selectHotel',{tourId});
    }
});

//router for fetching hotel
router.get('/fetchHotel/:tourId',async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        const tourId = req.params.tourId;
        let hotels = [];
        hotels = await hotel_query.getAllHotelByTourId(tourId);

        if(hotels == undefined)
        {
            return null;
        }
        else{

            console.log("fetch:",hotels);
            return res.json(hotels);
        }
    }
});

//router for render hotel room page 
router.get('/SeeHotelRoom/:hotel_id',async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        const hotel_id = req.params.hotel_id;
        res.render('room',{hotel_id});
    }
});


//router for fetching hotel
router.get('/fetchHotelRoom/:hotel_id',async(req,res)=>{
    if(req.user == null)
    {
        res.redirect('/login');
    }
    else{
        const hotel_id = req.params.hotel_id;
        let rooms = [];
        rooms = await hotel_query.getAllRoomByHotelId(hotel_id);

        if(rooms == undefined)
        {
            return null;
        }
        else{

            console.log("fetch:",rooms);
            return res.json(rooms);
        }
    }
});


module.exports = router;

