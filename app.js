const PORT = 3000;
let express = require("express");
let app =express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let Campground = require("./models/campground");
let Comment = require("./models/comment");
let seedDb = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));


//RENDER LANDING PAGE
app.get("/", (req, res)=>{
    res.redirect("campgrounds");
});

//INDEX ROUT - show all campgrounds
app.get("/campgrounds", (req, res)=>{
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
app.post("/campgrounds", (req, res)=>{
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
app.get("/campgrounds/new", (req, res)=>{
    res.render("campgrounds/new");
});

//SHOW - show info about one campground
app.get("/campgrounds/:id", (req, res)=>{
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

// ====================================================================================================
// Comments Routs
// ====================================================================================================

//CREATE A NEW COMMENT
app.get("/campgrounds/:id/comments/new", (req, res)=>{
    Campground.findById(req.params.id, (err, foundCampground)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: foundCampground});
        }
    });
}); 

app.post("/campgrounds/:id/comments", (req, res)=>{
    //lookup campground using id
    Campground.findById(req.params.id, (err, foundCampground)=>{
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment,(err, comment)=>{
                if(err){
                    console.log(err);
                    res.redirect("/compgrounds");
                }
                else{
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });

});

app.listen(PORT, ()=>{
    console.log("Yelp App Started");
});