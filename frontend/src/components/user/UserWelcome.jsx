import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Info from "../Info";


export default function UserWelcome(){
    const nav = useNavigate();
    const name = useSelector(state => state.login.authcred.name);
    console.log(name);

    useEffect(()=>{
        if(name === null){
        nav("/UserLogin");
    }
    })
    
    return (
        <>
        <h1>Welcome {name}</h1>
        <Info/>
        </>
    );
}