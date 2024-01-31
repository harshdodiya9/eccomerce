const mongoose = require('mongoose');





const subcatagorySchema = mongoose.Schema({
    subcatagory : {
        type : String,
        required : true
    },
  
    categoryid : {
        type: mongoose.Schema.Types.ObjectId,
        ref:"catagory",
        required : true
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



const subcatagory = mongoose.model("subcatagory",subcatagorySchema);
module.exports = subcatagory;