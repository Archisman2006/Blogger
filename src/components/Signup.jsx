import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import authservice from '../appwrite/auth'
import {login} from '../store/authSlice'
import {Input} from '../index'
export function Signup(){
const navigate=useNavigate();
const dispatch=useDispatch();
const [error,setError]=useState("");
const {register,handleSubmit}=useForm();

const create=async(data)=>{
    setError(""); console.log("ra ra rasputin");
    try {
    const userData = await authservice.createaccount(data)
    if(userData){
        const userData=await authservice.getcurrentuser();
        if(userData) dispatch(login(userData));
        navigate('/');
    }      
    } catch (error) {
        setError(error.message+"jbjbjvjvjv");
    }
}
return (
    <div className='h-120 mt-5 rounded-[10px] w-100 bg-purple-400 flex flex-col space-y-7 items-center '>
        <img src='./src/BLOGGER.png' className='h-30 rounded-full mt-5'/>
        <h2>Sign up to create account</h2>
        <p>Already have an account?&nbsp; 
            <Link to="/login" className='border-2 rounded-[5px] text-[16px] p-0.5'>Sign In</Link>
        </p>
        {error && <p className='h-10 bg-white'>{error}</p>}
        <form onSubmit={handleSubmit(create)} className='flex flex-col justify-around items-center h-45 w-full'>
        <Input  
        label="Name: " placeholder="Enter Full Name" autoComplete="on" {...register("name",{required:true})}
        className='w-full pl-2' inputclass='w-80 bg-purple-400'
        />
        <Input
        label="Email: "
        placeholder="Enter your email"
        autoComplete="on"
        type="email"
         className='w-full pl-2' inputclass='w-80 bg-purple-400'
        {...register("email", {
            required: true,
            validate: {
                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            }
        })}
        />
    <Input
        label="Password: "
        type="password"
        autoComplete="current-password"
        placeholder="Enter password"
         className='w-full pl-1' inputclass='w-80 bg-purple-400'
        {...register("password", {
            required: true,})}
    />
    <button type='submit' className='cursor-pointer border-2 rounded-[5px] px-0.5'>Create Account</button>
        </form>
    </div>
)
}