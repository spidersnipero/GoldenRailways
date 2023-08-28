import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch } from "react-redux";
import { loginActions } from "../../store/auth/auth";

export default function UserSignupPage(){
    const nav = useNavigate();
    const dispatch  = useDispatch();
    
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [cpassword,setcPassword] = useState("");
    const [age,setAge]  = useState(0);
    const [phoneno,setPhoneno]  = useState("");
    const [address,setAddress]  = useState("");
    const [error,setError] = useState("");


    function handleName(e){
        setName(e.target.value);
    }
    function handleEmail(e){
        setEmail(e.target.value);
    }
    function handlePassword(e){
        setPassword(e.target.value);
    }
    function handlecPassword(e){
        setcPassword(e.target.value);
    }
    function handleAge(e){
        setAge(e.target.value);
    }
    function handlePhoneno(e){
        setPhoneno(e.target.value);
    }

    function handleAddress(e){
        setAddress(e.target.value);
    }

    function validateForm() {
        if(name.length === 0){
            setError("Name is required");
            return false;
        }
        if(email.length === 0){
            setError("Email is required");
            return false;
        }
        if(password.length === 0 ){
            setError("Password is required");
            return false;
        }
        if(password.length < 6){
            setError("Password must be atleast 6 characters");
            return false;
        }
        if(password !== cpassword){
            setError("Password and Confirm Password must be same");
            return false;
        }
        if(age <=  0){
            setError("Age is required");
            return false;
        }
        if(phoneno.length === 0 && phoneno.length < 10){
            setError("Phone Number is required");
            return false;
        }
        if(address.length === 0){
            setError("Address is required");
            return false;
        }
        return true;
    }
            

    async function handleSubmit(e){
        e.preventDefault();
            if(validateForm()){
                const data = {
                name,
                email,
                password,
                age,
                phoneno,
                address
            }
            console.log(data);
            await fetch("http://localhost:8000/usersignup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(data)
            }).then((res)=>{
                if(res.status === 200){
                    console.log("User Registered Successfully");
                    localStorage.setItem("email",data.email);
                    localStorage.setItem("passcode",data.password)
                    dispatch(loginActions.setauthcred(data));
                    dispatch(loginActions.login());
                    dispatch(loginActions.setauthtype("user"));
                    nav("/app");
                }
                else{
                    setError("User Registration Failed");
            }})
        }
        
        
    }

    return(
        <>
        <div className=" text-center container w-50 mt-4 ">
            <h2>User Signup</h2>
            <form onSubmit={handleSubmit}  className="form-group">
                <input className="form-control mt-3"  type="text" placeholder="name" onChange={handleName} />
                <input className="form-control mt-3" type="email" placeholder="Enter email" onChange={handleEmail}/>
                <input className="form-control mt-3" type = "text" placeholder="Enter Password" onChange={handlePassword} />
                <input className="form-control mt-3" type = "text" placeholder="Confirm Password" onChange={handlecPassword} />
                <input className="form-control mt-3" type="number" placeholder="age" onChange={handleAge} />
                <textarea className="form-control mt-3" placeholder="enter address" onChange={handleAddress}/>
                <input className="form-control mt-3" type="text" placeholder="enter phone number" onChange={handlePhoneno} />
                <center className="mt-5">
                    <button className="btn btn-success form-control w-75" type="submit">Submit</button>
                </center>
            </form>
            {error!=="" && <h3 className="text-center mt-5">{error}</h3>}
        </div>
        </>
    )


}