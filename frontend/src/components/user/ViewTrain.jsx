import { useEffect ,useState} from "react";


export default function ViewTrain(props){
    const {train} = props;
    const [info, setInfo] = useState({});
    const [price ,setPrice] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8000/singletrain', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id:train.trainno})
            });
            const data = await res.json();
            console.log(data[0]);
            setInfo(data[0]);
        }
        fetchData();

    }, []);

    function handleSeats(e){
        setPrice(e.target.value*(train.arrival.hours - train.departure.hours) *17);
    }

    async function handleSubmit(e){
        e.preventDefault();
        const data={
            name:info.name,
            trainno:train.trainno,
            price:price,
            email:localStorage.getItem("email"),
            status:1,
            origin:train.origin,
            destination:train.destination,
        }
        console.log(data);
        if(price===0){
            alert("please enter seats");
            return;
        }
        await fetch('http://localhost:8000/createorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        // navigate("/app/myorders");
    }


    return (
        <div className="mb-3 d-flex " style={{border:" 2px solid grey",borderRadius:"8px",minWidth:"30%"}}>
            <div className="container">
                <h4 className="">Train Name: {info.name}</h4>
                <div>
                    <h6>{train.origin}  --  {train.destination}</h6>
                </div>
                <p>departure time : {train.departure.hours} : {train.departure.minutes}</p>
                <p>arrival time : {train.arrival.hours} : {train.arrival.minutes} </p>
            </div>
            <div className="my-auto">
                {price!==0 && <p>price : {price}</p>}
            <form className="m-3 d-flex" style={{alignSelf:"center"}} onSubmit={handleSubmit} >
                <input type="number" placeholder="enter seats" className="m-2 form-controle" onChange={handleSeats}  />
                <button className="btn btn-primary" type="submit">Book</button>
            </form>
            </div>
        </div>
    )
}