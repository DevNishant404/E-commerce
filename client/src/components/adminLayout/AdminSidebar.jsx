import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { ChartNoAxesCombined, LayoutDashboard, PackageCheck, ShoppingBasket } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";


import { Input } from "../ui/input";
import { Title } from "@radix-ui/react-dialog";

function AdminSidebar({open,setOpenSidebar}) {

    const navigate=useNavigate()

    const adminSideBarMenuItems=[
        {
            id:"dashboard",
            label:"Dashboard",
            path:"/admin/dashboard",
            icon:<LayoutDashboard />
    
        },
        {
            id:"products",
            label:"Products",
            path:"/admin/products",
            icon:<ShoppingBasket />,
    
    
    
        },
        {
            id:"orders",
            label:"Orders",
            path:"/admin/order",
            icon:<PackageCheck />
    
        },
    ]

    function menuItems(){
        return <nav className="flex flex-col gap-1">
            {
                adminSideBarMenuItems.map((menuItem)=>{
                    return <div onClick={()=>{navigate(`${menuItem.path}`)
                    setOpenSidebar?setOpenSidebar(false):null
                    }} key={menuItem.id} className="flex hover:bg-slate-200 text-slate-900 hover:text-black cursor-pointer items-center gap-2 rounded  py-2">
                        {
                            menuItem.icon
                        }
                        <p className="font-semibold">{menuItem.label}</p>
                    </div>
                })
            }
        </nav>
    }

    return ( 
        <>

         <Sheet open={open} onOpenChange={setOpenSidebar} className="lg:hidden">
            <SheetContent side="left" className="w-64 lg:hidden">
                <div className="flex flex-col h-full">
                    <SheetHeader className="border-b">
                        <SheetTitle>
                        < ChartNoAxesCombined />
                            
                            Admin Panel</SheetTitle>
                    </SheetHeader>
                    <div className="pl-3">
                    {menuItems()}

                    </div>
                </div>
            </SheetContent>
            </Sheet>   

        <aside  className="border-r-2 hidden w-64 lg:flex p-4 flex-col">
            <div onClick={()=>navigate("/admin/dashboard")} className="flex items-center gap-2 font-bold text-xl cursor-pointer">
                
            < ChartNoAxesCombined />

            <h1>Admin Panel</h1>
            </div>
            <div className="mt-5">
                {menuItems()}
            </div>
        </aside>
        </>
        
    
     );
}

export default AdminSidebar;