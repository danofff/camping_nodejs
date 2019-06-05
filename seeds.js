let mongoose = require("mongoose");
let Campground = require("./models/campground");
let Comment = require("./models/comment");

var data = [
    { 
        name: "Clouds Rest", 
        image: "https://images.unsplash.com/photo-1488682371245-58436e0dc611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1190&q=80",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    { 
        name: "Salmon Creek", 
        image: "https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    { 
        name: "Bright Nights", 
        image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    { 
        name: "Forest Lake", 
        image: "https://images.unsplash.com/photo-1536088783952-73987a7270a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
];

function seedDB(){
    // remove campgrounds
    Campground.deleteMany({}, (err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("removed camgrounds");
            //add few campgrounds and comments
            data.forEach((seed)=>{
                Campground.create(seed, (err, createdCampground)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("added camground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is grate, but i with there was internet",
                                author: "Homer"
                            }, (err, comment)=>{
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    createdCampground.comments.push(comment);
                                    createdCampground.save();
                                    console.log("created new comment");
                                }                            
                        });
                    }
                });
            });
        }
    });
}
module.exports = seedDB;