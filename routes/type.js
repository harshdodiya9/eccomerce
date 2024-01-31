const express = require('express');
const routs = express.Router(); 

const type = require('../models/type');
const  typeController = require('../controllers/typecontroller');


routs.get('/add_type',typeController.add_type);
routs.post('/inserttype' ,typeController.inserttype);
  routs.get('/view_type', typeController.view_type);

  routs.get("/setDeactivesub/:id",typeController.setDeactivesub);
 routs.get("/setActivesub/:id",typeController.setActivesub);
  routs.get("/deletetype/:id",typeController.deletetype);
  routs.get("/updatetype/:id",typeController.updatetype);
  routs.post("/edittype",typeController.edittype);
  routs.post("/deleteallsub",typeController.deleteallsub);
module.exports = routs;