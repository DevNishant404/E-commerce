import {  SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import CartIemContent from "./CartItemContent";


function CartWrapper({cartItems}) {
    return (  

        <SheetContent className="sm:max-w-md">
            <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4 px-4">
            {
                cartItems && cartItems.length>0? cartItems.map(item=><CartIemContent cartItems={item}></CartIemContent>) :null
            }
            </div>

            <div className="mt-8 space-y-4 px-4">
                <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">$1000</span>
                </div>
            </div>
            <Button className="cursor-pointer mx-4 mt-2">Checkout</Button>
        </SheetContent>
    );
}

export default CartWrapper;