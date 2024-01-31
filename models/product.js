const mongoose = require("mongoose");

const multer = require("multer");

const singleImage = "/uploades/productImage/singleImage";
const MultipalImage = "/uploades/productImage/multipleImage";

const path = require ("path");

const productSchema = mongoose.Schema({
    product_categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'catagory',
        required : true
    },
    product_subcategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subcatagory',
        required : true
    },
    product_extracategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'extracatagory',
        required : true
    },
    product_brandId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'brand',
        required : true
    },
    product_typeId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'type',
        required : true
    },
    product : {
        type : String,
        required : true
    },
    pprice : {
        type : String,
        required : true
    },
    old_price : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    size : {
        type : Array,
        required : true
    },
    color : {
        type : Array,
        required : true
    },
    product_image : {
        type : String,
        required : true
    },
    product_multi_image : {
        type : Array,
        required : true
    },
    // Upadate_Date:{
    //     type : String,
    //     required : true
    // },
    isactive : {
        type : Boolean,
        required : true
    },
});

const singleStorage = multer.diskStorage({
    destination :function(req , file,cb){
        if(file.fieldname == 'product_image'){
            cb(null,path.join(__dirname,"..",singleImage));
        }
        else{
            cb(null,path.join(__dirname,"..",MultipalImage));
        }
    },

    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+Math.random()*9999999);
    }

});

productSchema.statics.uploadImages = multer({storage:singleStorage}).fields([{name:'product_image',maxCount :1} ,{name:'product_multi_image' , maxCount:10}]);
productSchema.statics.singleImagePath = singleImage;
productSchema.statics.MultipalImagePath = MultipalImage;

const product = mongoose.model('product', productSchema);
module.exports = product;