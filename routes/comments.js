let express = require("express");
let router = express.Router({mergeParams: true});
let Campground = require("../models/campground");
let Comment = require("../models/comment");
let middleware = require("../middleware");


//CREATE A NEW COMMENT
router.get("/new", middleware.isLoggedIn, (req, res)=>{
    Campground.findById(req.params.id, (err, foundCampground)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: foundCampground});
        }
    });
}); 

router.post("/", middleware.isLoggedIn,  (req, res)=>{
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
                    //add username and id to comment
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    //save comment
                    comment.save();
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});

//COMMENT EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findById(req.params.comment_id, (err, foundComment)=>{
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comments/edit", {campground_id:req.params.id, comment: foundComment});
        }
    });
});

//COMMET UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedCommen)=>{
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    })
});

//COMMET DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
});


module.exports = router;