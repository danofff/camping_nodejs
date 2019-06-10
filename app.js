const PORT = 3000;
let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let passport = require("passport");
let localStrategy = require("passport-local");
let methodOverrde = require("method-override");
let flash = require("connect-flash");
let Campground = require("./models/campground");
let Comment = require("./models/comment");
let seedDb = require("./seeds");
let User = require("./models/user");

//requiring routes
let campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverrde("_method"));
app.use(flash());

//add some data to database
// seedDb();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "hudeSecret is a secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy (User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.listen(PORT, ()=>{
    console.log("Yelp App Started");
});