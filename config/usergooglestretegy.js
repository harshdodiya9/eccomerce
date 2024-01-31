const passport = require('passport')
const googlestretegy = require('passport-google-oauth20').Strategy;

const user = require('../models/user')
const bcrypt = require('bcrypt')


passport.use(new googlestretegy ({
    clientID: '971576972614-8le7ddjn8npn8ri890bcjrlss2hikio7.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8001/google/callback"

},

 async function(accessToken, refreshToken, profile, cb) {
     let checkmail = await user.findOne({email:profile.emails[0].value})

     if(checkmail){
         return cb(null,checkmail)
     }
     else{
         let userdata = {
                 username :profile.displayName,
                 email:profile.emails[0].value,
                 role : 'user',
                 password :  await bcrypt.hash('12345',10),
                 create_date: new Date().toLocaleString(),
                 update_date: new Date().toLocaleString(),


         }

         let userrecord = await user.create(userdata)
         if(userrecord){
             return cb(null,userrecord)
         }
         else{
             return cb(null,false)
         }
     }
  }

));


module.exports = passport;