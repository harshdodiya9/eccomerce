 const passport = require('passport');

 const passportlocal = require('passport-local').Strategy;
 const  Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const user = require('../models/user');

 passport.use(new passportlocal({
      usernameField : "email"
 },async function(email,password,done){
     let admindata = await Admin.findOne({email:email});
    
      if(admindata){
          if(password == admindata.password){
            return done(null,admindata);
        }
          
          else{
            return done(null,false);
        }
          
      }
      else{
          return done(null,false);
      }
 }))

 passport.use('user',new passportlocal({
  usernameField : "email"
},async function(email,password,done){
 let userdata = await user.findOne({email:email});
 console.log(userdata);

 if(userdata){
    if(await bcrypt.compare(password ,userdata.password)){
        return done(null,userdata);
    }
    else{
        return done(null,false);
    }
} 
else{
    return done(null,false);
}
}))

 passport.serializeUser(async(user,done)=>{
       return done(null,user.id);
 })

 passport.deserializeUser(async(id,done)=>{
      let adminrecord = await Admin.findById(id);
      
      let userrecord = await user.findById(id);
      
      if(adminrecord){
            return done(null,adminrecord)
      }
      else if(userrecord){
        return done(null,userrecord);
    }
      else{
         return done(null,false);
      }
 })

passport.setAuth = function(req,res,next){
    if(req.isAuthenticated()){
        if(req.user.role == 'admin'){
            res.locals.adminDetails = req.user;
        }
        else{
            res.locals.userDetails = req.user;
        }
    }
    return next();
}

passport.checkAuth = function(req,res,next){
    if(req.isAuthenticated()){
        if(req.user.role == 'user'){
            console.log("you have no authorization");
            return res.redirect('/')
        }
        next();
    }
    else{
        return res.redirect('/admin');
    }
}

passport.checkAuth = function(req,res,next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect("/");
    }
}

 module.exports = passport;