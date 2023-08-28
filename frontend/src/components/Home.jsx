import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Logo from './Logo';





export function Home(){
    const islogin = useSelector(state=>state.login.auth);
    const nav = useNavigate();
    useEffect(()=>{
        if(islogin){
        nav("/app");
    }
    })
    if(!islogin){
    return (
        <>

            <div className='container'>
                <h4 className='mt-5'>Best place for train tickets </h4>
                <p className='mt-3'>At Golden Railways, we're dedicated to providing you with 
                    a seamless and hassle-free experience when it comes to booking train tickets. 
                    Our commitment to customer satisfaction is unwavering, and we're here to make your 
                    travel dreams a reality</p>
                <br/>
                <h5>Our Locations</h5>
                <ul class="list-group list-group-flush w-50">
                    <li class="list-group-item ps-5">Guntur</li>
                    <li class="list-group-item ps-5">Vijayawada</li>
                    <li class="list-group-item ps-5">Ongole</li>
                    <li class="list-group-item ps-5">Tenali</li>
                    <li class="list-group-item ps-5">Tirupati</li>
                    <li class="list-group-item ps-5">Vishakapatnum</li>
                    
                </ul>
                <div className='mt-3'>
                    <button className='btn btn-outline-primary m-3' ><Link to="/userlogin" style={{textDecoration:"none"}} >Login as user</Link></button>
                    <button className='btn btn-outline-primary m-3'  ><Link to="/usersignup" style={{textDecoration:"none"}} >signup as user</Link></button>
                </div>
            </div>
        </>
    );
    }
    else{
        return <></>
    }
} 