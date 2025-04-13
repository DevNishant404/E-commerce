import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

function ShopingProductTile({product,handleProdctDetails,handleAddToCart}) {
    return ( 
        <div>
        <div
        onClick={()=>handleProdctDetails(product?._id)}
        className="w-full bg-white  rounded-t-xl">
            <div>
                <div className="relative border-b  rounded">
                    <img
                    className="w-full   h-[250px] object-cover rounded-t-xl"
                    src={product?.image} alt={product?.title} />

                    {
                        product?.salePrice>0?
                        <Badge className="absolute top-2 left-2 bg-red-600 hover:bg-red-500">Sale</Badge>:null
                    }
                </div>
                <div className="p-3">
                    <h4 className="text-xl font-bold ">{product.title}</h4>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{categoryOptionsMap[product?.category] }</span>
                        <span className="text-sm text-muted-foreground">{brandOptionsMap[product?.brand]}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className={`${product?.salePrice>0? "line-through" : ""} text-lg font-semibold `}>${product?.price}</span>
                        {
                            product?.salePrice>0 ?<span className="text-lg font-semibold ">${product?.salePrice}</span> :null
                        }
                        
                    </div>
                </div>

            </div>

        </div>
        <div id="cart-footer">
                    <Button
                    onClick={()=>handleAddToCart(product._id)}
                    className="w-full rounded cursor-pointer">Add to cart</Button>
                </div>
        </div>
     );
}

export default ShopingProductTile;