import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

export  function LogoutBtn(){
    const dispatch=useDispatch();
    const logouthandler=()=>{
        authService.logout().then(()=>dispatch(logout()))
    }
    return (
        <button className="cursor-pointer" onClick={logouthandler}>Log Out</button>
    )
}