let mongoose = require("mongoose");

let CommentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    date: {
        type: Date,
        default:Date.now
    }
});

module.exports=mongoose.model("Comment", CommentSchema);