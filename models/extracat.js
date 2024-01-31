const mongoose = require('mongoose');





const extracatagorySchema = mongoose.Schema({
    exsubcatagory : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"subcatagory",
        required : true
    },
  
   excategoryid : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"catagory",
        required : true
    },
    extracatagory :{
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



const extracatagory = mongoose.model("extracatagory",extracatagorySchema);
module.exports = extracatagory;