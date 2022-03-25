const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

//connect to the database
mongoose.connect("mongodb+srv://Harshwardhan:Harshwardhan@cluster0.x9vm5.mongodb.net/moviesDB?retryWrites=true&w=majority", {useNewUrlParser: true});

//create the schema
const userSchema = {
    firstname: String,
    lastname: String,
    moviename: String,
    seat: Number,
    popcorn: Boolean
}

//create the model
const UserDB = mongoose.model("UserDB", userSchema);

app.get("/bookings", function(req, res){
    UserDB.find(function(err, foundUsers){
        if(!err){
            res.send(foundUsers);;
        }
        else{
            res.send(err);
        }

    });
});

app.get("/bookings/:fname/",  function(req, res){
    UserDB.findOne({firstname: req.params.fname}, function(err, foundUser){
        if(!err){
            res.send(foundUser);
        }
        else{
            res.send(err);
        }
    });
});
app.get("/bookings",  function(req, res){
    UserDB.find( function(err, foundUser){
        if(!err){
            res.send(foundUser);
        }
        else{
            res.send(err);
        }
    });
});

app.post("/book", function(req, res){
    const newData = new UserDB({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        moviename: req.body.moviename,
        seat: req.body.seat,
        popcorn: req.body.popcorn
    });

    newData.save(function(err){
        if(!err){
            res.send("Successfully booked");
        }
        else{
            res.send(err);
        }
    });
});

app.delete("/cancelBooking", function(req, res){
    UserDB.deleteOne({firstname: req.body.firstname}, function(err){
        if(!err){
            res.send("Successfully cancelled");
        }
        else{
            res.send(err);
        }
    })
});

let port = process.env.PORT;
if(port == null || port == ""){
    port = 3000;
} 

app.listen(port, function(){
    console.log("Server started on port 3000.");
})
