const express =require("express")
const mongoose = require("mongoose")
const cookieParser=require("cookie-parser")
const cors= require("cors")
const authRouter=require("./routes/authRoutes")
const productRouter=require("./routes/admin/productsRoute")
const shopRouter=require("./routes/shop/productsRoutes")
const cartRouter=require("./routes/shop/cartRoutes")

mongoose.connect("mongodb+srv://devNishant:9szLm8NSLj-YruT@test.lm4bs.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=test").then(()=>console.log("Database is connected")).catch((error)=>console.log(error))

const app=express()



const PORT = process.env.PORT || 5000

const allowedOrigin=[
    "http://localhost:5173",
    "https://e-commerce-jade-chi-41.vercel.app"
]

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
    
        if (allowedOrigin.includes(origin)) {
          callback(null, true); 
        } else {
        }
      },
    methods:["GET","POST","DELETE","PUT"],
    allowedHeaders:[
        "content-type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials:true
}))

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/admin/products",productRouter)
app.use("/api/shop/products",shopRouter)
app.use("/api/shop/cart",cartRouter)

app.listen(PORT,()=>console.log(`server is now running on port ${PORT}`));