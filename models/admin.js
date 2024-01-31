const mongoose = require('mongoose');
const multer = require("multer");

const imagePath = "/uploades/adminImages";
const path = require("path");

const AdminSchema = mongoose.Schema({
    googleId :{
       type :String,   
    },
    name : {
        type : String,
        
    },
    email : {
        type : String,
        
    },
    password : {
        type : String,
        
    },
    description : {
        type : String,
        
    },
    city : {
       type : String,
        
    },
    gender : {
        type : String,
        
    },
    hobby : {
        type : Array,
        required: true
    },
    adminImage : {
        type : String,
        
    },
    isActive : {
        type : Boolean,
        
    },
    role : {
        type : String,
        
    },
    create_date : {
        type : String,
        
    },
    update_date : {
        type : String,
        
    },
})

const ImageStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",imagePath));
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now());
    }
})

AdminSchema.statics.uploadAdminImage = multer({storage :ImageStorage}).single("adminImage");
AdminSchema.statics.imageAdminPath = imagePath;

const Admin = mongoose.model("Admin",AdminSchema);
module.exports = Admin;