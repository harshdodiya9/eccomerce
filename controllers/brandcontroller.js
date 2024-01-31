const catagory =require('../models/catagory')
const subcatagory = require('../models/subcatagory')
const excategory = require('../models/extracat')
const brand = require('../models/brand')
const path = require('path')
const fs = require('fs')

module.exports.add_brand = async(req,res)=>{
    let allcatagorys = await catagory.find({});
    let allsubcatagory = await subcatagory.find({});
    let allextracatagory = await excategory.find({});
  
    
    
    return res.render('add_brand',{
        'cata' : allcatagorys,
        'subdata' : allsubcatagory,
        'extradata' : allextracatagory,
    });
}

module.exports.insertbrand = async(req,res)=>{
   
    req.body.isActive = true;
    req.body.create_date = new Date().toLocaleString();
    req.body.update_date = new Date().toLocaleString();
    let brands = await brand.create(req.body);
    return res.redirect('back')
}

module.exports.view_brand = async (req, res) => {
    try{
 
         let search = '';
         if(req.query.search){
            
             search= req.query.search;
         }
         
          if(req.query.page){
             page = req.query.page;
          }
          else{
             page=0;
          }
 
          var perpage =2;
          // total rec found 
          let totaladmindata = await brand.find({
             $or:[
              
                 {"brand":{$regex : ".*"+search+".*",$options:"i"}},
               
                 
                ]
          }).countDocuments();
          
          
 
          let data = await brand.find({
             $or:[
    
              
              {"brand":{$regex : ".*"+search+".*",$options:"i"}},
              
             
             ]
          })
          .limit(perpage)
          .skip(perpage*page).populate(['brand_categoryid','brand_subcategoryid','brand_extracategoryid']).exec();

         
          
         
          
         
         return res.render("view_brand",{
             adminData : data,
             search : search,
             cpage : page ,
             totaldoc : Math.ceil(totaladmindata/perpage)
         });
    }
    catch(err)
    {
         console.log(err);
         return res.redirect("back");
    }
 }

 
// de-active data
module.exports.setDeactivesub = async(req,res)=>{
    try{
        if(req.params.id)
        {
            let activeData = await brand.findByIdAndUpdate(req.params.id,{isActive : false});
        
            if(activeData)
            {
                console.log("Data is Deactive");
                return res.redirect("back");
            }
            else{
                console.log("Data is Active");
                return res.redirect("back");
            }
        }
        else
        {
             console.log("Params is Not Found!!!");
             return redirect("back");
        }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }
}


// active data
module.exports.setActivesub = async(req,res)=>{
    try{
        if(req.params.id)
        {
            let activeData = await brand.findByIdAndUpdate(req.params.id,{isActive : true});

            if(activeData)
            {
                console.log("Data is Active");
                return res.redirect("back");
            }
            else{
                console.log("Data is Deactive");
                return res.redirect("back");
            }
        }
        else
        {
            console.log("Params is Not Found!!!");
            return redirect("back");
        }
    }
    catch(err)
    {
        console.log(err);
        return res.redirect("back");
    }
}


// delete data
module.exports.deletebrand = async (req,res)=>{
    let oldData = await brand.findById(req.params.id);
    if(oldData)
    {
        var oldImage = oldData.catagoryImage;
        if(oldImage)
        {
            let FullPath = path.join(__dirname,"..",oldData.catagoryImage);
            await fs.unlinkSync(FullPath);
        }
    }
    else
    {
        console.log("Image Path is Worng");
        return res.redirect("back");
    }
   
    await brand.findByIdAndDelete(req.params.id);
    return res.redirect("back");

}

module.exports.deleteallsub =async (req,res)=>{

 await brand.deleteMany({_id:{$in:req.body.deleteall}});
 return res.redirect('back');
}


module.exports.updatebrand =async (req,res)=>{
    let record = await brand.findById(req.params.id);
    let catRecord  = await catagory.find({});
    let subRecord  = await subcatagory.find({});
    let exRecord  = await excategory.find({});
    return res.render("update_brand",{
        up : record,
        cata:  catRecord,
        subdata: subRecord,
         extradata: exRecord
      
    });
}

module.exports.editbrand = async(req,res)=>{
    
    try {
        req.body.isActive = true;
        req.body.update_date = new Date().toLocaleString();
        await brand.findByIdAndUpdate(req.body.EditId,req.body);
        return res.redirect("view_brand")
    } catch (err) {
        console.log(err);
    }
   
}