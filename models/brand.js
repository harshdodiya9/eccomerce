const mongoose = require('mongoose');





const brandSchema = mongoose.Schema({
   
  
    brand_categoryid : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"catagory",
        required : true
    },
    brand_subcategoryid : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"subcatagory",
        required : true
    },
    brand_extracategoryid : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"extracatagory",
        required : true
    },
    brand :{
        type : String,
        required: true
   },
  
   
    isActive : {
        type : Boolean,
        required : true
    },
    create_date : {
        type : String,
        required : true
    },
    update_date : {
        type : String,
        required : true
    }
})



const brand = mongoose.model("brand",brandSchema);
module.exports = brand;