const express = require('express');
const routs = express.Router(); 

const product = require('../models/product');
const  productController = require('../controllers/productcontroller');


routs.get('/add_product',productController.add_product);
 routs.post('/insertproduct',product.uploadImages,productController.insertproduct);
   routs.get('/view_product', productController.view_product);

   routs.get("/setDeactivesub/:id",productController.setDeactivesub);
  routs.get("/setActivesub/:id",productController.setActivesub);
   routs.get("/deleteproduct/:id",productController.deleteproduct);
   routs.get("/updateproduct/:id",productController.updateproduct);
  routs.post("/editproduct",product.uploadImages,productController.editproduct);
  routs.post("/deleteallsub",productController.deleteallsub);
module.exports = routs;