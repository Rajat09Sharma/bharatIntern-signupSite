const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const request = require("request");

const app=express();
mongoose.connect("mongodb://0.0.0.0:27017/signupDB");

const userSchema= new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String
});

const Userdata=mongoose.model("user",userSchema);

app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    if(!req.body.fname == 0 && !req.body.lname ==0 && !req.body.email==0 ){
            const firstName=req.body.fname;
            const lastName=req.body.lname;
            const email=req.body.email;

            const data= new Userdata({
                 email,
                 firstName,
                 lastName
                }
            );
            data.save();
            res.redirect("/success")
    }else{
        res.redirect("failure");
    }

});

app.get("/failure",function(req,res){
    res.sendFile(__dirname+"/failure.html");
});

app.get("/success",function(req,res){
    res.sendFile(__dirname+"/success.html");
});


app.listen(process.env.PORT || 4000,function(){
    console.log("server started on port 4000");
});


