function Producttile({product,setOpenCreateProductDialog,setFormData,setCurrentediteId,handleDelete}) {
    return ( 
        <div
       
        className="rounded-t-xl shadow-md  bg-white  cursor-pointer">
            <img className="w-full   h-[250px] object-cover rounded-t-xl" src={product.image} alt="" />
            <div className="p-2">
                <p className="text-lg font-semibold text-gray-800 ">{product.title}</p>
                <div className="flex justify-between">   
                <p className={`${product?.salePrice>0 ? "line-through" :""} font-medium text-blue-600`}>${product.price}</p>
                {
                    product.salePrice>0 ?  <p className="font-medium text-green-600">${product.salePrice}</p> :null
                }
               

                </div>
                <div className="flex justify-between items-center mt-1">
                    <button
                    onClick={()=>{
                        setCurrentediteId(product._id)
                        setFormData(product)
                        
                        setOpenCreateProductDialog(true)}}
                    className="bg-gray-600 text-white px-2  rounded text-sm cursor-pointer py-1">Edit</button>
                    <button 
                    onClick={()=>handleDelete(product._id)}
                    className="bg-red-600 text-white px-2  rounded text-sm cursor-pointer py-1">Delete</button>
                </div>
            </div>
        </div>
     );
}

export default Producttile;