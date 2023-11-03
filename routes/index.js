var express = require('express');
var router = express.Router();
const userModel = require('./users');
const passport = require('passport');
const localStrategy = require('passport-local');

passport.use(new localStrategy(userModel.authenticate()))

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/profile', isLoggedIn, async function(req, res, next){
  let users = await userModel.find()
  res.render('users', {users});
})


router.post('/register', function(req, res, next) {
    var userdets = new userModel({
      username: req.body.username,   
      email: req.body.email,
    });
    userModel.register(userdets, req.body.password) 
    .then(function(user){
      passport.authenticate("local")(req, res, function(){
        res.redirect("/");
      })
    })
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}), function(req, res, next){})

router.get("/logout", function(req, res, next){
  req.logout(function(err) {
    if (err) {return next(err); }
    res.redirect("/");
  })
})


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect("/")
  }
}

router.get('/users', async function(req, res, next) {
  var allUsers = await userModel.find() ;
  console.log(allUsers)
  res.render('users', {allUsers});
});

router.get('/likes/:id', isLoggedIn, async function(req, res) {
  let likedUser = await userModel.findOne({username: req.session.passport.user});
  likedUser.likes.push()
  await likedUser.save()
  res.redirect('/users');
})




module.exports = router;
