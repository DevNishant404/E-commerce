import { Outlet } from "react-router-dom";
import Shoppingheader from "./Shoppingheader";

function ShoppingLayout() {
    return ( 
        <div className="flex flex-col">
            
            {/* common header */}
            <Shoppingheader></Shoppingheader>
            <main className="flex  flex-col w-full">
                <Outlet></Outlet>

            </main>
        </div>
     );
}

export default ShoppingLayout;