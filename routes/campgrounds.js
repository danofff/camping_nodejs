let express = require("express");
let router = express.Router();
let Campground = require("../models/campground");
let Comment = require("../models/comment");

//INDEX ROUT - show all campgrounds
router.get("/", (req, res)=>{
    //Get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser:req.user});
        }
    });
});

//CREATE - add new campground to DB
router.post("/", (req, res)=>{
    // get data from form and add to campgrounds
    let name = req.body.name;
    let img = req.body.image;
    let desc = req.body.description;
    let newCampground = {name: name, image : img, description: desc};

    //create a new campground and save to db
    Campground.create(newCampground, (err, newlyCampground)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});


//NEW - form of adding new campground
router.get("/new", (req, res)=>{
    res.render("campgrounds/new");
});

//SHOW - show info about one campground
router.get("/:id", (req, res)=>{
    //find the campground with that campground id
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    //render show template with that campground
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;