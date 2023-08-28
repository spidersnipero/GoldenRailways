import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch } from "react-redux";
import { loginActions } from "../../store/auth/auth";

export default function UseLoginPage(){
    const nav = useNavigate();
    const dispatch  = useDispatch();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    function handleEmail(e){
        setEmail(e.target.value);
    }

    function handlePassword(e){
        setPassword(e.target.value);
    }
    function validateForm() {
        if(email.length === 0){
            setError("Email is required");
            return false;
        }
        if(password.length === 0){
            setError("Password is required");
            return false;
        }

        return true;
    }
    async function  handleSubmit(e){
        e.preventDefault();
        if(validateForm()){
            const data = {email,password};
            await fetch("http://localhost:8000/userlogin",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)
            }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                localStorage.setItem("email",data.email);
                localStorage.setItem("passcode",data.passcode)
                dispatch(loginActions.setauthcred(data));
                dispatch(loginActions.login());
                dispatch(loginActions.setauthtype("user"));
                nav("/app");
            })
            .catch((err) =>setError("Invalid Credentials"));
        }
        
    }

    return(
        <>
            <h2 className="text-center mt-5">User Login</h2>
            <div className="container w-25 ">
                <form onSubmit={handleSubmit} className="form-group">
                    <input className="form-control mt-5" type="email" placeholder="Enter email" onChange={handleEmail}/>
                    <input className="form-control mt-5" type = "password" placeholder="Enter Password" onChange={handlePassword} />
                    <center className="mt-5">
                    <button className="btn btn-success form-control w-75" type="submit">Submit</button>
                    </center>
                </form>
            </div>
            {error!=="" && <h3 className="text-center mt-5">{error}</h3>}
        </>
    )
}