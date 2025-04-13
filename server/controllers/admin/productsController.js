const {imageUploadUtils} =require("../../helpers/cloudaniry");
const product = require("../../models/product");
const handleImageUpload=async(req,res)=>{
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = `data:${req.file.mimetype};base64,${b64}`;
        const result=await imageUploadUtils(url)

        res.json({
            success:true,
            result,
        })
        
    } catch (error) {
        res.json({
            success:false,
            message:"Error occured"
        })
    }
}

// add new product

const addProducts=async(req,res)=>{
    try {
        const {image,title,description
            ,category,brand,price,salePrice,totalStock}=req.body

        const newlyCreatedProduct=new product({
            image,title,description,category,brand,price,salePrice,totalStock
        })

        await newlyCreatedProduct.save()
        res.status(201).json({
            succes:true,
            data:newlyCreatedProduct,
        })
        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error occured"
        })
    }
}

//fetch all product 

const fetchAllProducts=async(req,res)=>{
    try {

        const listOfProduts=await product.find({})
        res.status(200).json({
            success:true,
            data:listOfProduts
        })
        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error occured"
        })
    }
}

//edit product

const editProduct=async(req,res)=>{
    try {
        const{id}=req.params;
        console.log(req.body)
        const {image,title,description,category,brand,price,salePrice,totalStock}=req.body
        
        const findProduct=await product.findById(id)
        if(!findProduct){
            return res.staus(404).json({
                success:false,
                message:"Product not found"
            })
        }

        findProduct.title=title || findProduct.title
        findProduct.description=description || findProduct.description
        findProduct.category=category || findProduct.category
        findProduct.brand=brand || findProduct.brand
        findProduct.price=price === "" ? 0: price || findProduct.price
        findProduct.salePrice=salePrice === "" ? 0: salePrice || findProduct.salePrice
        findProduct.totalStock=totalStock || findProduct.totalStock
        findProduct.image=image || findProduct.image

        await findProduct.save()

        res.status(200).json({
            success:true,
            data:findProduct
        })



       

    } catch (error) {

        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error occured"
        })
    }
}

//deleted a product

const deleteProduct=async(req,res)=>{
    try {

        const {id}=req.params;
        const deleteProduct=await product.findByIdAndDelete(id)

        if(!deleteProduct) return res.staus(400).json({
            success:false,
            message:"Data not found"
        })

        res.status(200).json({
            success:true,
            message:"product is successfully deleted"
        })
        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            success:false,
            message:"Error occured"
        })
    }
}

module.exports={handleImageUpload,addProducts,fetchAllProducts,editProduct,deleteProduct}