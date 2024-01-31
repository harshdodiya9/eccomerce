const catagory =require('../models/catagory')
const subcatagory = require('../models/subcatagory')
const excategory = require('../models/extracat')
const brand = require('../models/brand')
const type = require('../models/type')
const product = require('../models/product')
const path = require('path')
const fs = require('fs')

module.exports.add_product = async(req,res)=>{
    let allcatagorys = await catagory.find({});
    let allsubcatagory = await subcatagory.find({});
    let allextracatagory = await excategory.find({});
    let allbrand = await brand.find({});
    let alltype = await type.find({});
  
    
    
    return res.render('add_product',{
        'cata' : allcatagorys,
        'subdata' : allsubcatagory,
        'extradata' : allextracatagory,
        'allbrand' : allbrand,
        'alltype' : alltype,

    });
}

module.exports.insertproduct = async(req,res)=>{
    //  console.log(req.body);
    //  console.log(req.files);

    var siImagpath = '';
    var muImagpath = [];
    req.body.isactive = true;
    if(req.files){
        siImagpath = product.singleImagePath+"/"+req.files.product_image[0].filename;
        
        for(var i=0; i<req.files.product_multi_image.length; i++){
            muImagpath.push(product.MultipalImagePath+"/"+req.files.product_multi_image[i].filename);
        }
    }
    
    req.body.product_image = siImagpath;
    req.body.product_multi_image = muImagpath;
    await product.create(req.body);
    return res.redirect("back");
}

module.exports.view_product = async (req, res) => {
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
          let totaladmindata = await product.find({
             $or:[
              
                 {"product":{$regex : ".*"+search+".*",$options:"i"}},
               
                 
                ]
          }).countDocuments();
          
          
 
          let data = await product.find({
             $or:[
    
              
              {"product":{$regex : ".*"+search+".*",$options:"i"}},
              
             
             ]
          })
          .limit(perpage)
          .skip(perpage*page).populate(['product_categoryId','product_subcategoryId','product_extracategoryId','product_brandId','product_typeId']).exec();

         
          
         
          
         
         return res.render("view_product",{
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
            let activeData = await product.findByIdAndUpdate(req.params.id,{isActive : false});
        
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
            let activeData = await product.findByIdAndUpdate(req.params.id,{isActive : true});

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
module.exports.deleteproduct = async (req,res)=>{
    let oldData = await product.findById(req.params.id);
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
   
    await product.findByIdAndDelete(req.params.id);
    return res.redirect("back");

}

module.exports.deleteallsub =async (req,res)=>{

 await product.deleteMany({_id:{$in:req.body.deleteall}});
 return res.redirect('back');
}

module.exports.updateproduct =async (req,res)=>{
    let record = await product.findById(req.params.id);
    let catRecord  = await catagory.find({});
    let subRecord  = await subcatagory.find({});
    let exRecord  = await excategory.find({});
    let brands  = await brand.find({});
    let types  = await type.find({});
    return res.render("update_product",{
        up : record,
        cata:  catRecord,
        subdata: subRecord,
         extradata: exRecord,
         allbrand: brands,
         alltype: types
      
    });
}

module.exports.editproduct = async(req,res)=>{
    
    try {
        if (req.files.product_image) {
            let oldData = await product.findById(req.body.EditId);
            if (oldData) {
                if (oldData.product_image) {
                    let fullPath = path.join(__dirname,'..',oldData.product_image);
                   // await fs.unlinkSync(fullPath);
                }
                if(req.files.product_multi_image){
                    let multipleimg = [];
                    let oldpro = await product.findById(req.body.EditId);
                    
                   // console.log(oldpro.multipleproductimage[0]);
                     for(var j=0;j<oldpro.product_multi_image.length;j++){
                         multipleimg.push(oldpro.product_multi_image[j]); 
                     }
                    for(var i=0;i<req.files.product_multi_image.length;i++){
                        multipleimg.push(product.MultipalImagePath+"/"+req.files.product_multi_image[i].filename); 
                    }
                    req.body.product_multi_image = multipleimg;
                }
                var productImagePath = product.singleImagePath+'/'+req.files.product_image[0].filename;
                req.body.product_image = productImagePath;
               
                // req.body.Upadate_Date = new Date().toLocaleString();
                let ad = await product.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/product/view_product');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/product/view_product');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/product/view_product');
            }
        }
        else {
            let oldData = await product.findById(req.body.EditId);
            if (oldData) {
                if(req.files.product_multi_image){
                    let multipleimg = [];
                    let oldpro = await product.findById(req.body.EditId);
                    
                   // console.log(oldpro.multipleproductimage[0]);
                     for(var j=0;j<oldpro.product_multi_image.length;j++){
                         multipleimg.push(oldpro.product_multi_image[j]); 
                     }
                    for(var i=0;i<req.files.product_multi_image.length;i++){
                        multipleimg.push(product.MultipalImagePath+"/"+req.files.product_multi_image[i].filename); 
                    }
                    req.body.product_multi_image = multipleimg;
                }
                req.body.product_image = oldData.ProductImage;
                
                // req.body.Upadate_Date = new Date().toLocaleString();
                let ad = await product.findByIdAndUpdate(req.body.EditId, req.body);
                if (ad) {
                    console.log("Record & Image Update Succesfully");
                    return res.redirect('/admin/product/view_product');
                }
                else {
                    console.log("Record Not Updated");
                    return res.redirect('/admin/product/view_product');
                }
            }
            else {
                console.log("Record Not Updated");
                return res.redirect('/admin/product/view_product');
            }
        }


        
    } 
    catch (err) {
        console.log(err);
    }
   
}