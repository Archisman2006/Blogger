import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import { login,logout } from "./store/authSlice";
import {Outlet} from 'react-router-dom'
import {Header,Footer} from './index'
function App() {
const [loading,setLoading]=useState(true);
const dispatch=useDispatch();
useEffect(()=>{
  console.log("inside app()");
  
authService.getcurrentuser().then((data)=>{
  console.log("after getcurrentuser()");
  
  if(data) dispatch(login(data));
  else dispatch(logout());
}).finally(()=>setLoading(false));
},[])
return !loading?(<div className='min-h-screen bg-purple-300 flex flex-col overflow-x-hidden'><Header/><main className='flex-1'><Outlet/></main><Footer/></div>):<h1>Loading...</h1>;
}

export default App
