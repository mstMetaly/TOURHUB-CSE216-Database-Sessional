//Importing libraries that we installed using npm 
const express=require("express");
const path=require("path");
const ejs=require("ejs");

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//middlewares
const auth= require('./middlewares/authentication').auth;


//module export
const signupRoute=require('./Routes/signup');
const loginRoute=require('./Routes/login');
const homeRoute=require('./Routes/home');
const logoutRoute=require('./Routes/logout');
const packagesRoute = require('./Routes/packages');



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
app.use('/',signupRoute);
app.use('/',loginRoute);
app.use('/',homeRoute);
app.use('/',logoutRoute);
app.use('/',packagesRoute);


app.get("/",(req,res)=>{
    res.render('firstPage');
});

const PORT=3000;

app.listen(PORT,()=>{
    console.log('Server running on port',`${PORT}`);
});
