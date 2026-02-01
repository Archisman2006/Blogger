import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
export  function  AuthLayout({children,authentication=true}){
    const navigate=useNavigate();
    const [loader,setLoader]=useState(true);
    const authstatus=useSelector(state=>state.auth.status);
    useEffect(()=>{
        if(authentication && authstatus!=authentication){ //protected route
            navigate('/login'); return;
        }
        else if(!authentication && authstatus!==authentication) {navigate('/'); return;} //public-only route
        setLoader(false);
    },[authstatus,navigate,authentication])

return loader?<h1>Loading...</h1>:children;
}