const express = require('express');
const routs = express.Router(); 

const subcatagory = require('../models/subcatagory');
const subcatagoryController = require('../controllers/subcatController');


routs.get('/add_subcatagory',  subcatagoryController.add_subcatagory);
routs.post('/add_subcatagorydata' ,subcatagoryController.add_subcatagorydata);
routs.get('/view_subcatagory', subcatagoryController.view_subcatagory);

 routs.get("/setDeactivesub/:id",subcatagoryController.setDeactivesub);
routs.get("/setActivesub/:id",subcatagoryController.setActivesub);
routs.get("/deletesubcatagorydata/:id",subcatagoryController.deletesubcatagorydata);
routs.get("/updatesubcatagory/:id",subcatagoryController.updatesubcatagory);
routs.post("/editsubcatagorydata",subcatagoryController.editsubcatagorydata);
routs.post("/deleteallsub",subcatagoryController.deleteallsub);
module.exports = routs;