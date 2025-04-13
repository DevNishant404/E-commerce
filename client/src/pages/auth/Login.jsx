import CommonForm from "@/components/common/CommonForm";
import { loginFormControl } from "@/config";
import { loginUser } from "@/store/auth-slice/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";


const initialState={
    email:'',
    password:''
}

function Login(){
    const[formData,setFormData]=useState(initialState)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    function onSubmit(e){
        e.preventDefault()
        dispatch(loginUser(formData)).then((data)=>{
            if(data?.payload?.success){
            toast.success(data?.payload?.message,{
                style: { backgroundColor: "green", color: "white" },
              })
            }else{
                toast.error(data?.payload?.message,{
                    style: { backgroundColor: "red", color: "white" },
                  })
            }
        })
        
    }

    return(
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Sign In
                </h1>
                <p className="mt-2">Don't have an account ? <Link  className="text-blue-500 hover:underline font-medium" to={"/auth/register"}>Register</Link></p>
                
            </div>
            <CommonForm formControls={loginFormControl} buttonText={"Sign Up"} formData={formData} setFormData={setFormData}onSubmit={onSubmit}></CommonForm>
        </div>
    )
}

export default Login;