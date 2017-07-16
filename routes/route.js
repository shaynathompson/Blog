//Declaring mongoose dependency and Story Model
var mongoose = require( 'mongoose' );
var Story = mongoose.model( 'Story' );

//Renders index page which is the login page
exports.index=function(req,res){
                  res.render('index',{session:req.session});
}


//Renders home page with all stories created
exports.home=function(req,res){
             Story.find({}, function(err,stories){
                  res.render('home',{stories:stories});
              });
}

//Renders registration page
exports.register=function(req,res){
  res.render('register');
}


//Renders login page
exports.login=function(req,res){
                    res.render('login');
}

//Creates new story if user is logged in, otherwise redirect to login page									
exports.newStory=function(req,res){
          if(req.session.loggedIn !== true){
            res.redirect('/');
          }else{
              res.render('new-story',{session:req.session});
          }

}
