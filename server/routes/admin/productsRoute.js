const express=require("express")

const {handleImageUpload,addProducts,editProduct,deleteProduct,fetchAllProducts}=require("../../controllers/admin/productsController")

const {upload}=require("../../helpers/cloudaniry")

const router=express.Router()

router.post('/upload-image',upload.single("my_file"),handleImageUpload)

router.post("/add",addProducts)
router.put("/edit/:id",editProduct)
router.delete("/delete/:id",deleteProduct)
router.get("/get",fetchAllProducts)


module.exports=router;