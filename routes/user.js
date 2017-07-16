//Declaring mongoose dependency and User Model
var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User' );

//Once registration is successful, takes user to home page
exports.registrationSuccessful=function(req,res){
  res.render('new-user');
}

//Logs out and destroys active session
exports.logout=function(req,res){
    console.log("Logging  Out :"+req.session.username);
    var loggedOutUser=req.session.username;
    req.session.destroy();
    res.render('index',{loggedOutUser:loggedOutUser});
}

//Creates new user account
exports.doCreate=function(req,res){
   var username=req.body.username;
   var email=req.body.email;
   var password=req.body.password;

   var newuser=new User();
   newuser.username=username;
   newuser.email=email;
   newuser.password=password;

   newuser.save(function(err,savedUser){
       if(err){
         console.log("Username or email already exists");
         var message="Username or email already exists";
         res.render("register",{errorMessage:message});
         return;
       }else{
         req.session.newuser=savedUser.username;
         res.render("new-user",{session:req.session});
       }
   });
}

//Logs in and creates a new session
exports.login=function(req,res){
    var email=req.body.email;
    var password=req.body.password;

	//searches for user with email address entered
    User.findOne({email:email}, function(err,user){
      console.log("User "+user);
      if(user==null){
        console.log("User is null redirecting to login");
        var message="Invalid email or password";
        console.log("Message :"+message);
        res.render("index",{errorMessage:message});
        return;
      }

	//compares password in database with the password entered
     user.comparePassword(password,function(err,isMatch){
       if(isMatch && isMatch==true){
         console.log("Authentication Sucessfull");
         req.session.username=user.username;
         req.session.loggedIn=true;
         console.log("Got User : "+req.session.username);
         res.render("new-story",{session:req.session});
       }else{
         console.log("Authentication UnSucessfull");
         var message="Invalid email or password";
         console.log("Message :"+message);
         res.render("index",{errorMessage:message});
         return;
       }
     });
    });
  }
