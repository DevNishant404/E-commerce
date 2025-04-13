const express=require("express")
const {getFilteredProducts,getProducDetals}=require("../../controllers/shop/ProductController")


const router=express.Router()

router.get("/get",getFilteredProducts)
router.get("/get/:id",getProducDetals)

module.exports=router;