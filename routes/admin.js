const express = require('express');
const routes = express.Router();
const adminController = require("../controllers/adminController");
const Admin = require("../models/admin");
const passport = require('passport');


//login with google

routes.get("/google",passport.authenticate('google',{scope : ['profile','email']}))
routes.get('/google/callback',passport.authenticate('google',{failureRedirect : '/admin/login'}),adminController.checklogin)

routes.get("/",async (req,res)=>{
    if(req.cookies.adminName)
    {
        return res.redirect("/admin/deshboard");
    }
   
    return res.render('login');
});

routes.get("/failRedirect", async(req,res)=>{
    req.flash("error","INvalid credential");
    return res.redirect('/admin/')
})

routes.get("/deshboard",passport.checkAuth,adminController.deshboard);
routes.get("/add_admin",passport.checkAuth,adminController.add_admin);
routes.post("/addAdminData",Admin.uploadAdminImage,passport.checkAuth, adminController.addAdminData );
routes.get("/view_admin",passport.checkAuth,adminController.view_admin);
routes.get("/setDeactive/:id",passport.checkAuth,adminController.setDeactive);
routes.get("/setActive/:id",passport.checkAuth,adminController.setActive);
routes.get("/deleteAdminData/:id",passport.checkAuth,adminController.deleteAdminData);
routes.get("/updateAdminData/:id",passport.checkAuth,adminController.updateAdminData);
routes.post("/EditAdminData",passport.checkAuth,Admin.uploadAdminImage,adminController.EditAdminData);
routes.post("/checklogin",passport.authenticate('local',{failureRedirect:"/admin/failRedirect"}),adminController.checklogin);
routes.get("/changepassword",passport.checkAuth,adminController.changepassword);
routes.post("/modifypass",passport.checkAuth,adminController.modifypass);
routes.get("/profile",passport.checkAuth,adminController.profile);
routes.get("/updateProfile/:id",passport.checkAuth,adminController.updateProfile);

routes.post("/deleteall",passport.checkAuth,adminController.deleteall);



routes.get("/logout",async (req,res)=>{
    res.clearCookie("adminName");
    return res.redirect("/admin");
});  

// forget pass 

routes.get("/mailpage",async(req,res)=>{
    return res.render("forgetpass/mailpage")
})

routes.post("/checkmail",adminController.checkmail);

routes.get("/otppage",async(req,res)=>{
   return res.render("forgetpass/otppage");
})
routes.post("/checkotp",adminController.checkotp);
routes.get("/resetPass",async(req,res)=>{
 return res.render("forgetpass/resetPass");
})
routes.post("/verifyPass",adminController.verifyPass);

 
 routes.use('/catagory',passport.checkAuth,require('./catagory'));
 routes.use('/subcat',passport.checkAuth,require('./subcat'));
 routes.use('/extracat',passport.checkAuth,require('./extracat'));
 routes.use('/brand',passport.checkAuth,require('./brand'));
 routes.use('/type',passport.checkAuth,require('./type'));
 routes.use('/product',passport.checkAuth,require('./product'));



module.exports =routes;