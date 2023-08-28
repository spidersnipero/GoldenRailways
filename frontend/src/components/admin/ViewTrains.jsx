import { useState,useEffect } from "react";
import TrainCard from "./TrainCard";

export default function ViewAllTrains(){
    const [trains,setTrains] = useState([{name:"train1"},{name:"train2"}]);

    useEffect(()=>{
        async function middlefunction(){
            await fetch("http://localhost:8000/viewalltrains")
            .then(res=>res.json())
            .then(data=>{setTrains(data)})
        }
        middlefunction();
    },[])
    return(
        <div>
            <h1>View All Trains</h1>
            <div className="container" style={{display:"inline-flex",flexWrap: "wrap",width:"100%"}}>
                {trains.map((train)=>{
                    return (
                        <TrainCard train={train} />
                    );
                })}
            </div>
        </div>
    )
}