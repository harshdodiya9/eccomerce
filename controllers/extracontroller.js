const catagory =require('../models/catagory')
const subcatagory = require('../models/subcatagory')
const excategory = require('../models/extracat')
const brand = require('../models/brand')
const path = require('path')
const fs = require('fs')

module.exports.add_extracatagory = async(req,res)=>{
    let allcatagorys = await catagory.find({});
    let allsubcatagory = await subcatagory.find({});
  
    
    
    return res.render('add_extracatagory',{
        'cata' : allcatagorys,
        'subdata' : allsubcatagory
    });
}


module.exports.add_extracatagorydata = async(req,res)=>{
   
    req.body.isActive = true;
    req.body.create_date = new Date().toLocaleString();
    req.body.update_date = new Date().toLocaleString();
    let extracat = await excategory.create(req.body);
    return res.redirect('back')
}

module.exports.view_extracatagory = async (req, res) => {
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
          let totaladmindata = await excategory.find({
             $or:[
              
                 {"extracatagory":{$regex : ".*"+search+".*",$options:"i"}},
               
                 
                ]
          }).countDocuments();
          
          
 
          let data = await excategory.find({
             $or:[
    
              
              {"extracatagory":{$regex : ".*"+search+".*",$options:"i"}},
              
             
             ]
          })
          .limit(perpage)
          .skip(perpage*page).populate(['exsubcatagory','excategoryid']).exec();

         
          
         
          
         
         return res.render("view_extracatagory",{
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
            let activeData = await excategory.findByIdAndUpdate(req.params.id,{isActive : false});
        
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
            let activeData = await excategory.findByIdAndUpdate(req.params.id,{isActive : true});

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
module.exports.deleteextracatagorydata = async (req,res)=>{
    let oldData = await excategory.findById(req.params.id);
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
   
    await excategory.findByIdAndDelete(req.params.id);
    return res.redirect("back");

}

module.exports.deleteallsub =async (req,res)=>{

 await excategory.deleteMany({_id:{$in:req.body.deleteall}});
 return res.redirect('back');
}



module.exports.updateextracatagory =async (req,res)=>{
    let record = await excategory.findById(req.params.id);
    let catRecord  = await catagory.find({});
    let subRecord  = await subcatagory.find({});
    return res.render("update_extracatagory",{
        up : record,
        cata:  catRecord,
        subdata: subRecord
      
    });
}

module.exports.editextracatagory = async(req,res)=>{
    
    try {
        req.body.isActive = true;
        req.body.update_date = new Date().toLocaleString();
        await excategory.findByIdAndUpdate(req.body.EditId,req.body);
        return res.redirect("view_extracatagory")
    } catch (err) {
        console.log(err);
    }
   
}

module.exports.getSubcategoryId = async(req,res)=>{
    //  console.log(req.body.categoryId);
    let subData = await subcatagory.find({'categoryid' : req.body.categoryId});
    let sss = '<option value="">--Select Subcategory--</option>'
    subData.map((v,i)=>{
       sss += ` <option value="${v.id}">${v.subcatagory}</option>`
    });
    return res.json(sss);
}


module.exports.getExtracategoryId = async(req,res)=>{
    //   console.log(req.body.exsubcatagory);
   
    let subData = await excategory.find({'exsubcatagory' : req.body.SubId});
    let sss = '<option value="">--Select Extracategory--</option>'
    subData.map((v,i)=>{
       sss += ` <option value="${v.id}">${v.extracatagory}</option>`
    });
    // console.log(sss);
    return res.json(sss);
 }

// Ajax
// module.exports.getBrandTypeData = async(req,res)=>{

//     console.log(req.body);
//     let brandData = await brand.find({'brand_subcategoryId' : req.body.subCatId,"brand_categoryId":req.body.categoryId , 'brand_extracategoryId' : req.body.extraCatId});
//     let typeData = await type.find({'type_subcategoryId' : req.body.subCatId,"type_categoryId":req.body.categoryId , 'type_extracategoryId' : req.body.extraCatId});
//     return res.render("ajaxBrandType",{
//         brand : brandData,
//         type : typeData
//     })
// }