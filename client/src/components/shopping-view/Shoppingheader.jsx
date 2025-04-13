import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewheaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { logout } from "@/store/auth-slice/authSlice";
import { useEffect, useState } from "react";
import CartWrapper from "./CartWrapper";
import { fetchCartItem } from "@/store/cart/cartSlice";
function menuItems(setIsOpen) {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewheaderMenuItems.map((menuitem) => (
        <Link
          key={menuitem.id}
          to={menuitem.path}
          className="font-semibold"
          onClick={() => {
            if (typeof setIsOpen === "function") setIsOpen(false);
          }}
        >
          {menuitem.label}
        </Link>
      ))}
    </nav>
  );
}


function headerRightContent() {
  const {cartItems}=useSelector((state)=>state.ShopCart)

  let { user } = useSelector((state) => state.auth);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const[openCartSheet,setOpenCartSheet]=useState(false)

  function handlelogout(){
    console.log("hey")
    dispatch(logout()).then((data)=>{
        console.log(data)
    })
  }

  useEffect(()=>{
    if (user && user.id) {
      dispatch(fetchCartItem({ userId: user.id }));
    }
  },[])

  return (
    <div className="flex lg:items-center lg:flex-row  flex-col gap-4">

      <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
      <Button onClick={()=>setOpenCartSheet(true)} variant="outline" size="icon" className="cursor-pointer">
        <ShoppingCart className="w-6 h-6" />
        <span className="sr-only">User cart</span>
      </Button>
      <CartWrapper cartItems={cartItems}></CartWrapper>
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="w-6 h-6 rounded-full cursor-pointer bg-black text-white font-extrabold flex justify-center items-center p-4">
            {user.user[0].toUpperCase()}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56  " side="right">
          <DropdownMenuLabel className="border-b">Logged in a {user.user}</DropdownMenuLabel>
         <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={()=>navigate('/shop/account')} className="flex items-center cursor-pointer hover:bg-gray-100 mt-2 outline-none py-1">
            <UserCog className="mr-2 h-4 w-4"></UserCog>
            Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>handlelogout()} className="flex items-center cursor-pointer hover:bg-gray-100 outline-none py-1">
            <LogOut className="mr-2 h-4 w-4">
            </LogOut>
            Logout
            
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function Shoppingheader() {



  const [isOpen, setIsOpen]=useState(false)
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 item-center justify-between py-2 px-3">
        <Link className="flex gap-1 justify-center" to={"/shop/home"}>
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">E-commerce</span>
        </Link>

        <div className="hidden lg:block">{menuItems()}</div>
        <div className="hidden lg:block">{headerRightContent()}</div>
        <Sheet className=""  open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden cursor-pointer"
            >
              <Menu className="h-6 w-6"></Menu>
              <span className="sr-only">Toogle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-5xl lg:hidden p-3">
            {menuItems(setIsOpen)}
            {headerRightContent()}
          </SheetContent>
        </Sheet>
        {}
      </div>
    </header>
  );
}

export default Shoppingheader;
