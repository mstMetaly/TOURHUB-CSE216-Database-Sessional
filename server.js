//Importing libraries that we installed using npm 
const express=require("express");
const path=require("path");
const ejs=require("ejs");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//middlewares
const auth= require('./middlewares/authentication').auth;
const adminAuth = require('./middlewares/authentication').adminAuth;


//module export
const signupRoute=require('./Routes/Auth/signup');
const loginRoute=require('./Routes/Auth/login');
const homeRoute=require('./Routes/User/home');
const logoutRoute=require('./Routes/Auth/logout');
const packagesRoute = require('./Routes/Package/packages');
const packageDetailsRoute = require('./Routes/Package/packageDetails');
const locationRoute = require('./Routes/Package/location');
const bookingRoute = require('./Routes/Booking/booking');
const adminHomeRouter = require('./Routes/Admin/adminHome');
const fetchAdminHomeRouter = require('./Routes/Admin/fetchAdminHome');
const locationDetailsRoute = require('./Routes/Package/locationDetails');
const reviewRouter = require('./Routes/Review/review');



const app=express();

//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


//define paths
app.use(express.static(path.join(__dirname, 'Public')));

// Configure EJS as the view engine
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory

app.use(express.urlencoded({extended: false}));

//Routes
app.use(auth);
app.use(adminAuth);

app.use('/',signupRoute);
app.use('/',loginRoute);
app.use('/',homeRoute);
app.use('/',logoutRoute);
app.use('/',packagesRoute);
app.use('/',packageDetailsRoute);
app.use('/',locationRoute);
app.use('/',bookingRoute);
app.use('/',adminHomeRouter);
app.use('/',fetchAdminHomeRouter);
app.use('/',locationDetailsRoute);
app.use('/',reviewRouter);


app.get("/",(req,res)=>{
    res.render('index');
});

const PORT=3000;

app.listen(PORT,()=>{
    console.log('Server running on port',`${PORT}`);
});
