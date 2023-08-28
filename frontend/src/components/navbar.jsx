import {useSelector,useDispatch } from "react-redux";
import { loginActions } from "../store/auth/auth";
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useNavigate } from "react-router-dom";

export default function Navbar(){
    const dispatch = useDispatch();
    const nav = useNavigate();

    const st = useSelector(state=>state.login.auth);
    const authtype = useSelector(state=>state.login.authtype);

    function handleLogout(){
        localStorage.removeItem("email");
        localStorage.removeItem("passcode");
        dispatch(loginActions.logout());
        nav("/");

    }

    if(st){
        if(authtype==="user"){
            return (
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <h1 className='mt-3' style={{color:"gold"}} > <Link style={{textDecoration:"none"}}  to="/" >
                {<Logo />} </Link>Golden railways</h1>
                        <div>
                            <button className="btn btn-primary  m-2 "><Link className="text-white " style={{textDecoration: "none"}} to="/app">Home</Link> </button>
                            <button className="btn btn-primary  m-2 "><Link className="text-white " style={{textDecoration: "none"}} to="/app/searchtrains"><span className="me-2">🔍</span>search trains</Link></button>
                            <button className="btn btn-primary  m-2"><Link className="text-white" style={{textDecoration: "none"}} to='/app/myprofile' >My profile</Link></button>
                            <button className="btn btn-primary  m-2"><Link className="text-white" style={{textDecoration: "none"}} to='/app/myorders' >My orders</Link></button>
                            <button className="btn btn-outline-danger m-2 " onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </nav>
            );
        }
        if(authtype==="admin"){
            return (

                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <h1 className='mt-3' style={{color:"gold"}} > <Link style={{textDecoration:"none"}}  to="/" >
                            {<Logo />} </Link>Golden railways</h1>
                        <div>
                            <button className="btn btn-primary  m-2 "><Link className="text-white " style={{textDecoration: "none"}} to="/app">Home</Link> </button>
                            <button className="btn btn-primary  m-2"><Link className="text-white" style={{textDecoration: "none"}} to="/app/mytrains" >View trains</Link></button>
                            <button className="btn btn-primary  m-2"><Link className="text-white" style={{textDecoration: "none"}} to='/app/allorders' >My orders</Link></button>
                            <button className="btn btn-outline-danger m-2 " onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </nav>
                
            );
        }
    }
    else{
        return(
            <div>
            <h1 className='mt-3' style={{color:"gold"}} > <Link style={{textDecoration:"none"}}  to="/" >
                {<Logo />} </Link>Golden railways  <span className='m-3' style={{float:"right"}}>
                    <button className='btn btn-outline-primary'>
                        <Link style={{textDecoration:"none"}}  to="/adminlogin" >Login as admin</Link></button>
                        </span></h1>
                        
            </div>
        )
    }
   
}