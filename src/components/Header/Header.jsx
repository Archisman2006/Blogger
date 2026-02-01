import React from "react"
import { useNavigate,useLocation} from "react-router-dom"
import {LogoutBtn,Container} from "../../index"
import { useSelector } from "react-redux"
export  function Header(){
const authstatus=useSelector(state=>state.auth.status);
const location=useLocation();
const navigate=useNavigate();
const navitems=[
    {
    name:'Home',slug:'/',active:true
    },{
    name:'Login',slug:'/login',active:!authstatus
    },{
    name:'SignUp',slug:'/signup',active:!authstatus
    },{
    name:'My Posts',slug:'/my-posts',active:authstatus
    },{
    name:'Add Post',slug:'/add-post',active:authstatus
    },
]
return(
    <header className="h-30">
        <Container>
            <nav className="flex justify-between bg-purple-100">
                <div className="w-30 h-30 ml-3"><img src="./public/BLOGGER.png" className="w-30 rounded-[10px]" alt="" /></div>
                <ul className=" flex w-130 justify-around items-center mr-50 text-[20px] ">
                {navitems.map((item)=>(
                    item.active?<li key={item.name}><button onClick={()=>navigate(item.slug)} 
                    className={`rounded-[10px] p-0.5 cursor-pointer ${location.pathname===item.slug?'border-2 bg-purple-200':null}`} >
                    {item.name}</button></li>:null
                ))}   
                {authstatus && (
                <li>
                <LogoutBtn/>
                </li>
                )} 
                </ul>
            </nav>
        </Container>
    </header>
)
}