import {Link,useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import { useState } from 'react';
import authservice from '../appwrite/auth'
import {login as authlogin} from '../store/authSlice'
import {Input} from '../index'
export function Login(){
const navigate= useNavigate();
const dispatch= useDispatch();
const {register,handleSubmit}=useForm(); 
const [error,setError]=useState("");
const login=async (data)=>{
    setError("");
    try {
    const session= await authservice.login(data);
    if(session){
        const userdata=await authservice.getcurrentuser();
        if(userdata) dispatch(authlogin(userdata));
        navigate("/");
        } 
    } catch (error) {
        setError(error.message);
    }
}
return (
    <div className='h-120 mt-5 rounded-[10px] w-100 bg-purple-400 flex flex-col space-y-7 items-center '>
        <img src="/BLOGGER.png"  className='h-30 rounded-full mt-5' />
        <h2>Sign in to your account</h2>
        <p>
        Don&apos;t have any account?&nbsp;
        <Link to="/signup" className='border-2 rounded-[5px] text-[16px] p-0.5'>Sign Up</Link>
        </p>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit(login)} className='flex flex-col justify-around items-center h-45 w-full'>
        <Input
        label="Email: " placeholder="enter your email" autocomplete="on" type="email" {...register("email",{
            required:true,
            validate:{
            matchPattern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be valid"
            }
        })}
         className='w-full pl-2' inputclass='w-80 bg-purple-400'
        />
        <Input 
        label="password: " placeholder="enter password" type="password" autoComplete="current-password"
        {...register("password",{
            required:true,
        })}
         className='w-full pl-1' inputclass='w-80 bg-purple-400'
        />
        <button type='submit' className='cursor-pointer border-2 rounded-[5px] px-0.5'>Sign In</button>
        </form>
    </div>
)
}