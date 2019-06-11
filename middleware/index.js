let Comment = require("../models/comment");
let Campground = require("../models/campground");

let middlewareObj = {
    checkCampgroundOwnership: (req, res, next)=>{
        if(req.isAuthenticated()){
            Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
                if(err){
                    req.flash("error", "campground not found!");
                    console.log(err);
                    res.redirect("back");
                }
                else{
                    //does user own the campground
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();
                    }
                    else{
                        req.flash("error", "It seems, that you didn't add this campground");
                        res.redirect("/campgrounds/"+foundCampground._id);
                        }
                    }
                });
        }
        else{
            req.flash("error", "Please, log in");
            res.redirect("/login");
        }
    },
    checkCommentOwnership: (req, res, next)=>{
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, (err, foundComment)=>{
                if(err){
                    console.log(err);
                    res.redirect("back");
                }
                else{
                    //does user own the comment
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    }
                    else{
                        req.flash("error", "You don't have permission to do that.");
                        res.redirect("back");
                    }
                }
            });
        }
        else{
            req.flash("error", "Please, log in");
            res.redirect("back");
        }
    },
    isLoggedIn: (req, res, next)=>{
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "Please, log in!");
        res.redirect("/login");
    }
};




module.exports = middlewareObj;