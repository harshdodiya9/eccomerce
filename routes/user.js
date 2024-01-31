const express = require('express');

const routes = express.Router();

const userController = require('../controllers/usercontroller/userController');
const product = require('../models/product');
const passport = require('passport');

routes.get("/google",passport.authenticate('google',{scope : ['profile','email']}))
routes.get('/google/callback',passport.authenticate('google',{failureRedirect : '/userLogin'}),userController.checkuserLogin)

routes.get("/", userController.home);
routes.get("/productList/:catId/:subId/:extraId", userController.productList);
routes.get('/product_details/:id',userController.product_details);
routes.get('/userLogin',userController.userLogin);
routes.post('/userRegister',userController.userRegister);
routes.post('/checkuserLogin',passport.authenticate('user',{failureRedirect:'/userLogin'}),userController.checkuserLogin);


routes.post('/insertCart',passport.checkAuth,userController.insertCart);
routes.get('/viewcart',passport.checkAuth,userController.viewcart);

routes.post('/changeQuantity', passport.checkAuth , userController.changeQuantity);
module.exports = routes;