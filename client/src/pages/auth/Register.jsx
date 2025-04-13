import CommonForm from "@/components/common/CommonForm";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";



const initialState={
    username:'',
    email:'',
    password:''
}

function Register(){
    const[formData,setFormData]=useState(initialState)
    const dispatch=useDispatch()
    const navigate=useNavigate()


    function onSubmit(event){
        event.preventDefault()
        dispatch(registerUser(formData))
        .then((data) =>{
            if(data?.payload?.success){
                toast.success(data?.payload?.message);
                navigate("/auth/login")
            }else{
                toast.error(data?.payload?.message, {
                    style: { backgroundColor: "red", color: "white" },
                  });
            }
        } )
        

    }

    return(
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Create new account</h1>
                <p className="mt-2">Aleady have an account ? <Link  className="text-blue-500 hover:underline font-medium" to={"/auth/login"}>Login</Link></p>
                
            </div>
            <CommonForm formControls={registerFormControls} buttonText={"Sign Up"} formData={formData} setFormData={setFormData}onSubmit={onSubmit}></CommonForm>
        </div>
    )
}

export default Register;