const mongoose = require('mongoose');





const typeSchema = mongoose.Schema({
   
  
    type_categoryid : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"catagory",
        required : true
    },
    type_subcategoryid : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"subcatagory",
        required : true
    },
    type_extracategoryid : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"extracatagory",
        required : true
    },
    type_brandid :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'brand',
        required : true
    },
    type :{
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



const type = mongoose.model("type",typeSchema);
module.exports = type;