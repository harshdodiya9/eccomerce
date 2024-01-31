const express = require('express');
const port = 8001;
const app = express();
const path = require('path');

// const db = require("./config/mongoose");
const Admin = require("./models/admin");



const mongoose = require('mongoose')
mongoose.connect(("mongodb+srv://dodiyaharsh99:harsh123@cluster0.zqnwysw.mongodb.net/eccomerce"), {
     useUnifiedTopology: true,
     useNewUrlParser: true
 })
     .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


const flash = require('connect-flash')

app.use(flash());

const custom = require('./config/coustomemiddleware');
// cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.urlencoded());
const session = require('express-session');

const passport = require('passport');
const passportlocal = require('./config/passport-local');

const googleauth = require('./config/googlestretegy');
const google =require('passport-google-oauth20')
const usergoogle = require('./config/usergooglestretegy');

app.use(session({
      name : "harsh",
      secret : "harsh",
      resave : false,
      saveUninitialized: true,
       cookie : {
           maxAge : 1000*60*100
       }
}))

app.use(custom.setflsh)
app.use(passport.initialize());
app.use(passport.session())
app.use(passport.setAuth);
// routing
app.use("/" , require("./routes/user"));
app.use("/admin",require("./routes/admin"));
app.use(express.static(path.join(__dirname,"assets")));
app.use(express.static(path.join(__dirname , "userAssets")));
app.use("/uploades",express.static(path.join(__dirname,"uploades")));


app.listen(port,function(err){
    if(err)
    console.log(err);

    console.log(`Server is running port :${port}`);
})