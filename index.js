//index.js for backend
var express = require("express"),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    // cookieParser = require('cookie-parser'),
    app = express(),
    db = require("./models");


app.use(express.static(__dirname + "/public"));
app.use("/vendor", express.static(__dirname+"/vendor"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');



db.User.find({}, function(err, foundUsers){
  if(err){
    return console.log(err);
  }
});

/*
 * create our session
 */
app.use(
  session({
    secret: 'secret-private-key',
    resave: false,
    saveUninitialized: true
  })
);

app.use(function (req, res, next) {
  // login a user
  req.login = function (user) {
    req.session.userId = user._id;
  };
  // find the current user
  req.currentUser = function (cb) {
    db.User.
      findOne({ _id: req.session.userId },
      function (err, user) {
        req.user = user;
        cb(null, user);
      })
  };
  // logout the current user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  }
  // call the next middleware in the stack
  next(); 
});

/*
 * Routes
 */

// where the user submits the sign-up form
app.post(["/signup", "/users"], function signup(req, res) {
  // grab the user from the params
  var user = req.body.user;
  // pull out their email & password
  var email = user.email;
  var password = user.password;
  // create the new user
  db.User.createSecure(email, password, function() {
    res.send(email + " is registered!\n");
  });
});


app.post(["/login", "/sessions"], function login(req, res){
  var user = req.body.user;
  var email = user.email;
  var password = user.password;
  db.User.authenticate(email, password, function(err, user){
    if (err === null) {
      req.login(user);
      res.redirect("/");
    } else {
      res.send(err);
    }
  });
});

app.get("/", function(req, res){
  // find current user
  req.currentUser(function(err, user) {
    // render page with found user (but one may not be found...)
    res.render('index', {user: user, score: 0, timer: 120});
  })
});

app.post(["/sessions", "/logout"], function(req,res){
  req.logout();
  res.redirect("/");
  });

//###########################################################
//db access to render previous scores
  app.get("partials/leaderboard", function(req, res){
    res.render('leaderboard');
  //############ display all user scores on leaderboard

  //find one user
  db.User.findOne({_id: req.session.id}, 
    function(err, user){
        if(err){ console.log(err);
        res.sendstatus(400);}
       // else send user's scores from scores array
        res.send(user.scores);
          
        res.render("leaderboard", scores);
     }
   )
 });

//###### post to leaderboard 
 app.post("partials/leaderboard", function(req, res){
   var points = req.body.data.points
   var time = req.body.data.time;
  // find user in db.user
   db.user.findOne({_id: req.session.id},
    function(err, user){
      //we have our user
      // var win = points + time;
      user.scores.push(win);
      //save function 
       user.save(function(err, success){
        if(success){
          console.log("yay")
        } else {
             console.log(err);
           }
           res.send(err || success);
       })

     })
 });

//###############################################################
 /*
 * Server
 */
 // var listener = app.listen(process.env.PORT || 3000);

  var listener = app.listen(3000, function() {
    console.log("Listening on port " + listener.address().port);
  });