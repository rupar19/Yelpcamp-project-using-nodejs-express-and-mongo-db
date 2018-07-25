var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
router.get("/",function(req,res){
        Campground.find({},function(err,allCampgrounds){
         if(err){
             console.log(err);
         }else
         {
           res.render("campground/index", {campgrounds:allCampgrounds});  
         }
     }) ;         
        
   
});

router.post("/",function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description:desc};
    //create new campground and save to db
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
         res.redirect("/campgrounds");   
        }
    });
    
});

router.get("/new",function(req,res){
    res.render("campground/new");
});

router.get("/:id",function(req,res){
//find the campground with provided id
Campground.findById(req.params.id).populate("comments").exec(function(err,findCampground){
    if(err){
        console.log(err);
    }else{
        res.render("campground/show",{campground:findCampground});
    }
});
});

module.exports=router;