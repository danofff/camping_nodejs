let mongoose = require("mongoose");

//Schema Setup
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
let Campground = mongoose.model("Campground", campgroundSchema);
module.exports=Campground;