import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/auth/auth";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage(){
    const dispatch  = useDispatch();
    const nav = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    function handleEmail(e){
        setEmail(e.target.value);
    }
    function handlePassword(e){
        setPassword(e.target.value);
    }

    async function handleSubmit(e){
        e.preventDefault();
        const data = {email,password};
        await fetch("http://localhost:8000/adminlogin",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            localStorage.setItem("email",data.email);
            localStorage.setItem("passcode",data.passcode)
            dispatch(loginActions.setauthtype("admin"));
            dispatch(loginActions.setauthcred(data));
            dispatch(loginActions.login());
            nav("/app");
        }
        )
    }

    return(
        <>
        <h2 className="text-center mt-5">Admin Login</h2>
        <div className="container w-25 ">
            <form onSubmit={handleSubmit}>
                <input type="email" className="form-control mt-5" placeholder="Enter email" onChange={handleEmail}/>
                <input type = "password" className="form-control mt-5" placeholder="Enter Password" onChange={handlePassword} />
                <center className="mt-5">
                    <button className="btn btn-success form-control w-75" type="submit">Submit</button>
                </center>
            </form>
        </div>
        
        </>
    )
}