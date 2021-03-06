let express = require("express");
let router = express.Router();
let Campground = require("../models/campground");
let Comment = require("../models/comment");
let middleware = require("../middleware");

//INDEX ROUT - show all campgrounds
router.get("/", (req, res)=>{
    //Get all campgrounds from DB
    Campground.find({}, (err, allCampgrounds)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, (req, res)=>{
    // get data from form and add to campgrounds
    let name = req.body.name;
    let img = req.body.image;
    let desc = req.body.description;
    let price = req.body.price;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newCampground = {name: name, image : img, description: desc, author: author, price: price};

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
router.get("/new", middleware.isLoggedIn, (req, res)=>{
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

//EDIT - edit created campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res)=>{
    Campground.findById(req.params.id, (err, foundCampground)=>{
        if(err){
            req.flash("error", "Campground not found!");
            res.redirect("back");
        }
        res.render("campgrounds/edit", {campground: foundCampground});
    });        
});
//UPDATE - update edited campground
router.put("/:id", middleware.checkCampgroundOwnership, (req, res)=>{
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground)=>{
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


//DESTROY - delete campgrounds form database
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res)=>{
    Campground.findOneAndDelete(req.param.id, (err)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;