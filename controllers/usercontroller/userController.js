const Category = require('../../models/catagory');
const Subcategory = require('../../models/subcatagory');
const ExtraCategory = require("../../models/extracat");
const Product = require('../../models/product');
const user = require('../../models/user');
const cart = require('../../models/cart');
const bcrypt = require('bcrypt');
const catagory = require('../../models/catagory');
const subcatagory = require('../../models/subcatagory');
const extracatagory = require('../../models/extracat');
const product = require('../../models/product');



module.exports.home = async (req,res) =>{
    let catData = await Category.find({});
    // console.log(catData);
    let subData = await Subcategory.find({});
    let extraData = await ExtraCategory.find({});

    let countCart;
        if(req.user){
            countCart = await cart.find({userId:req.user.id,status:'pending'}).countDocuments();
        }

    
    return res.render('userpanel/home',{
        'catData' :catData,
        'subData': subData,
        'extraData' : extraData,
        'countCart' : countCart?countCart:0,
    });
}

module.exports.productList = async (req,res) =>{
    let catData = await Category.find({});
    let subData = await Subcategory.find({});
    let extraData = await ExtraCategory.find({});
    
    let productData = await Product.find({'product_categoryId':req.params.catId,'product_subcategoryId':req.params.subId,'product_extracategoryId':req.params.extraId}).populate('product_brandId').exec();

    let countCart;
        if(req.user){
            countCart = await cart.find({userId:req.user.id,status:'pending'}).countDocuments();
        }

    
    let brandname =[];
    console.log(brandname);
    productData.forEach((v,i) => {
        let pos = brandname.findIndex((v1,i1)=>{v1.id==v.id});
        if(pos== -1){
            brandname.push({name :  v.product_brandId.brand,id:v.product_brandId.id});
        }
    });

    return res.render('userpanel/productList',{
        'productList' : productData,
        'catData' :catData,
        'subData': subData,
        'extraData' : extraData,
        'brandlist' :brandname,
        'countCart' : countCart?countCart:0,
        
    })
}
module.exports.product_details = async (req,res)=>{
    let catData = await catagory.find({});
    let subData = await subcatagory.find({});
    let extraData = await extracatagory.find({});
    let singleproData = await product.findById(req.params.id);

    let countCart;
    if(req.user){
        countCart = await cart.find({userId:req.user.id,status:'pending'}).countDocuments();
    }

    return res.render('userPanel/product_details',{
        'catData' :catData,
        'subData': subData,
        'extraData' : extraData,
        'spData' : singleproData,
        'countCart' : countCart?countCart:0,
    })
}

module.exports.userLogin = async(req,res)=>{
    let catData = await catagory.find({});
    let subData = await subcatagory.find({});
    let extraData = await extracatagory.find({});

    let countCart;
    if(req.user){
        countCart = await cart.find({userId:req.user.id,status:'pending'}).countDocuments();
    }
    
    return res.render('userPanel/userLogin',{
        'catData' :catData,
        'subData': subData,
        'extraData' : extraData,
        'countCart' : countCart?countCart:0,
    })
}

module.exports.userRegister = async(req,res)=>{
    req.body.role = 'user';
    req.body.create_date = new Date().toLocaleString();
    req.body.updated_date = new Date().toLocaleString();

    let checkemail = await user.findOne({email:req.body.email});
    if(checkemail){
        console.log("Email already register");
        return res.redirect('back');
    }
    else{
        if(req.body.password == req.body.cpassword){
            req.body.password = await bcrypt.hash(req.body.password,10);
            await user.create(req.body);
            return res.redirect('/');
        }
        else{
            console.log("Password not match");
            return res.redirect('back');
        }
    }

}
module.exports.checkuserLogin = async(req,res)=>{
    try{
        return res.redirect('/');
    }
    catch(err){
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.insertCart = async(req,res)=>{
    try{
        let cartProduct = await cart.findOne({productId : req.body.productId,userId:req.user.id});
        if(cartProduct){
            console.log("Product is already into cart");
            return res.redirect("back");
        }
        else{
            req.body.userId = req.user.id;
            req.body.status = "pending";
            req.body.create_date = new Date().toLocaleString();
            req.body.updated_date = new Date().toLocaleString();
            let AddCart = await cart.create(req.body);
            console.log(AddCart);
            if(AddCart){
                console.log("Product add into cart");
                return res.redirect("back");
            } 
            else{
                console.log("something is wrong");
                return res.redirect("back");
            }
        }
    }
    catch(err){
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.viewcart = async(req,res)=>{
    try{
        let countCart;
        if(req.user){
            countCart = await cart.find({userId:req.user.id,status:'pending'}).countDocuments();
            cartPendingData = await cart.find({userId:req.user.id,status:'pending'}).populate('productId').exec();
        }
        let categoryData = await catagory.find({});
        let subcatData = await subcatagory.find({});
        let extracatData = await extracatagory.find({});

        return res.render('userPanel/viewcart',{
            'catData' : cartPendingData,
            'categoryData' : categoryData,
            'subData' : subcatData,
            'extraData' : extracatData,
            'countCart' : countCart
        })
    }
    catch(err){
        console.log(err);
        return res.redirect("back");
    }
}


module.exports.changeQuantity = async(req,res)=>{
    try{
        await cart.findByIdAndUpdate(req.body.cartId,{quantity : req.body.quantity});
        return res.status(200).json({msg: "Successfully change "});
    }
    catch(err){
        console.log(err);
        return res.redirect("back");
    }
}
