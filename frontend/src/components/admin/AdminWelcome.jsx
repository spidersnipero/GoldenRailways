import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Info from "../Info";


export default function AdminWelcome(){
    const nav = useNavigate();
    const name = useSelector(state => state.login.authcred.name);
    console.log(name);

    useEffect(()=>{
        if(name === null){
        nav("/AdminLogin");
    }
    })
    
    return (
        <>
        <h1>Welcome {name}</h1>
        <Info/>
        </>
    );
}