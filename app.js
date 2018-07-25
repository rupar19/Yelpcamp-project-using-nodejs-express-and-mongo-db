var express               = require("express"),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User                  = require("./models/user"),
    Campground            = require("./models/campground"),
    seedDB                = require("./seeds"),
    Comment               = require("./models/comment");
    
var app   = express();
mongoose.connect("mongodb://localhost/yelp_camp_v7");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
seedDB(); 
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
//passport configuration
app.use(require("express-session")({
    secret:"Do or die",
    resave : false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});
 app.use(indexRoutes);
 app.use("/campgrounds",campgroundRoutes);
 app.use("/campgrounds/:id/comments",commentRoutes);
 
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started ");
});
