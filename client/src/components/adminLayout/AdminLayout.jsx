import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHearder";
import AdminSidebar from "./AdminSidebar";
import { useState } from "react";

function AdminLayout() {
    const[openSidebar,setOpenSidebar]=useState(false)
    return (  
        <div className={`flex min-h-screen  w-full relative`}>
            <AdminSidebar  open={openSidebar} setOpenSidebar={setOpenSidebar}></AdminSidebar>
            <div className="flex flex-1 flex-col">
                <AdminHeader setOpenSidebar={setOpenSidebar}></AdminHeader>
                <main className="flex-1 flex bg-slate-100 p-3">
                    <Outlet></Outlet>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;