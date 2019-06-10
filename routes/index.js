let express = require("express");
let router = express.Router();
let passport = require("passport");
let User = require("../models/user");


//RENDER LANDING PAGE
router.get("/", (req, res)=>{
    res.render("landing");
});

//AUTH ROUTES
router.get("/register", (req, res)=>{
    res.render("register");
});

router.post("/register", (req, res)=>{
    let newUser = new User ({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            res.render("register");
        }
        else{
            passport.authenticate("local")(req, res, ()=>{
                res.redirect("/campgrounds");
            });
        }
    });
});

//LOGIN FORM
router.get("/login", (req, res)=>{
    res.render("login");
});

router.post("/login",passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res)=>{
});


//LOGOUT
router.get("/logout", (req, res)=>{
    req.logOut();
    req.flash("success", "Successfuly logged out!");
    res.redirect("/campgrounds");
});

module.exports = router;