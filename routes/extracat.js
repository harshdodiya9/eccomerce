const express = require('express');
const routs = express.Router(); 

const excategory = require('../models/extracat');
const  excategoryController = require('../controllers/extracontroller');


routs.get('/add_extracatagory',excategoryController.add_extracatagory);
 routs.post('/add_extracatagorydata' ,excategoryController.add_extracatagorydata);
routs.get('/view_extracatagory', excategoryController.view_extracatagory);

 routs.get("/setDeactivesub/:id",excategoryController.setDeactivesub);
 routs.get("/setActivesub/:id",excategoryController.setActivesub);
 routs.get("/deleteextracatagorydata/:id",excategoryController.deleteextracatagorydata);
 routs.get("/updateextracatagory/:id",excategoryController.updateextracatagory);
 routs.post("/editextracatagory",excategoryController.editextracatagory);
 routs.post("/deleteallsub",excategoryController.deleteallsub);
routs.post("/getSubcategoryId" , excategoryController.getSubcategoryId);

 routs.post("/getExtracategoryId" , excategoryController.getExtracategoryId);
 
//  routes.post("/getBrandTypeData", excategoryController.getBrandTypeData);
module.exports = routs;