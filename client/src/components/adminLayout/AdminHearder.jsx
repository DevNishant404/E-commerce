import { logout } from "@/store/auth-slice/authSlice";
import { TrendingUpDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function AdminHeader({setOpenSidebar}) {
    const dispatch=useDispatch()

    function handleOnclik(){
        dispatch(logout()).then((data)=>{
            console.log(data)
            if(data?.payload?.success){
                toast.success(data.payload.message)
            }
        })
        
    }
    return ( 
        <header className="flex  items-center lg:justify-end border-b-2 justify-between px-4 py-2">
            <button  onClick={()=>setOpenSidebar(true)} className="lg:hidden sm:block">
            <i class="bi bi-list text-2xl font-bold cursor-pointer text-white block rounded bg-black px-2"></i>
            </button>
            <div>
                <button
                onClick={handleOnclik}
                className="bg-black text-white cursor-pointer h-8 px-2 rounded"><i className="bi bi-box-arrow-right">&nbsp;&nbsp;&nbsp;</i>Logout</button>
            </div>
        </header>
     );
}

export default AdminHeader;