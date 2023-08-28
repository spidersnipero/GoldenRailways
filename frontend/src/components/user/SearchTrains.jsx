import { useState } from "react"
import ViewTrain from "./ViewTrain";

export default function SearchTrains(){
    const [origin,setOrgin] = useState("");
    const [destination,setDestination] = useState("");
    const [data,setData] = useState([]);

    function handleOrgin(e){
        setOrgin(e.target.value);
    }
    function handleDestination(e){
        setDestination(e.target.value);
    }

    async function handleSubmit(e){
        e.preventDefault();
        const data = {origin,destination};
        await fetch("http://localhost:8000/searchtrains",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => setData(data)).then(console.log(data))
        .catch(err => console.log(err))
    }


    return(
        <div className="text-center mt-5 ">
            <form className="container d-flex" onSubmit={handleSubmit}>
                <div className="form-group me-5">
                    <input className="form-control" placeholder="enter Origin location" onChange={handleOrgin}/>
                </div>
                <div className="form-group me-5">
                    <input className="form-control" placeholder="enter destination" onChange={handleDestination}/>
                </div>
                <button type="submit" className="btn btn-success">Search</button>
            </form>
            {data.length>0 && <div className="container mt-5">
                    {
                        data.map((train) => {
                            return(
                                <ViewTrain train={train} key={train.trainno}/>
                            )
                        }   
                        )
                    }
                </div>}
        </div>
    )
}