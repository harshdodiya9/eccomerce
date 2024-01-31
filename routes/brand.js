const express = require('express');
const routs = express.Router(); 

const brand = require('../models/brand');
const  brandController = require('../controllers/brandcontroller');


routs.get('/add_brand',brandController.add_brand);
  routs.post('/insertbrand' ,brandController.insertbrand);
 routs.get('/view_brand', brandController.view_brand);

 routs.get("/setDeactivesub/:id",brandController.setDeactivesub);
 routs.get("/setActivesub/:id",brandController.setActivesub);
 routs.get("/deletebrand/:id",brandController.deletebrand);
 routs.get("/updatebrand/:id",brandController.updatebrand);
 routs.post("/editbrand",brandController.editbrand);
 routs.post("/deleteallsub",brandController.deleteallsub);
module.exports = routs;