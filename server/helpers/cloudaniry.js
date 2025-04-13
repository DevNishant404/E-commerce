const cloudinary=require("cloudinary")
const multer=require("multer")

cloudinary.config({
    cloud_name:"dewynntmg",
    api_key:"936562526431583",
    api_secret:"B555NzlkU2BGSJAjO8sg3vEcDgM",
})

const storage= new multer.memoryStorage();


async function imageUploadUtils(file){
    const result=await cloudinary.uploader.upload(file,{
        resource_type:"auto"
    })

    return result;
}

const upload=multer({storage});
module.exports={upload,imageUploadUtils}