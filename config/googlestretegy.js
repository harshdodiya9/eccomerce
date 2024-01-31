const passport = require('passport')
const googlestretegy = require('passport-google-oauth20').Strategy;

const admin = require('../models/admin')


passport.use(new googlestretegy ({
    clientID: '383542347134-cg0vgd1o9s895a7mqmj9sg2opba6ujkq.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8001/admin/google/callback"

},

 async function(accessToken, refreshToken, profile, cb) {
     let checkmail = await admin.findOne({email:profile.emails[0].value})

     if(checkmail){
         return cb(null,checkmail)
     }
     else{
         let admindata = {
                 name :profile.displayName,
                 email:profile.emails[0].value,
                 role : 'admin',
                 password : '12345',
                 isActive : true,
                 adminImage: profile.photos[0].value,
                 create_date: new Date().toLocaleString(),
                 update_date: new Date().toLocaleString(),


         }

         let adminrecord = await admin.create(admindata)
         if(adminrecord){
             return cb(null,adminrecord)
         }
         else{
             return cb(null,false)
         }
     }
  }

));


module.exports = passport;