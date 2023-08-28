import React from 'react'
import { useEffect,useState } from 'react'
import OrderTrain from './OrderTrain';
import { useSelector } from 'react-redux';


const Myorders = () => {
  const [waitingorders, setWaitingorders] = useState([]);
  const [acceptedorders, setAcceptedorders] = useState([]);
  const [rejectedorders, setRejectedorders] = useState([]);
  const rerun = useSelector(state => state.rerender.val);
  useEffect(() => {
    console.log(rerun)
    setWaitingorders([]);
    setAcceptedorders([]);
    setRejectedorders([]);
    const fetchData = async () => {
      const res = await fetch('http://localhost:8000/userorders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: localStorage.getItem("email") })
      });
      const data = await res.json();
      console.log(data);
      for(let i=0;i<data.length;i++){
        if(data[i].status===1){
          setWaitingorders(prev=>[...prev,data[i]]);
        }
        else if(data[i].status===2){
          setAcceptedorders(prev=>[...prev,data[i]]);
        }
        else{
          setRejectedorders(prev=>[...prev,data[i]]);
        }
      }
    }
    fetchData();
  }, [rerun]);

  return (
    <div className='container mt-2'>
      <h1>Myorders</h1>
      <h4>Waiting Tickets</h4>
      <div className='container'>
      {waitingorders.map((order) => (
        <OrderTrain key={ order.trainno+order.destination } order={order} />
      ))}
      {waitingorders.length===0 && <p className='mt-3'>No pending Tickets</p>}
      </div>
      <h4>Accepted Tickets</h4>
      <div className='container '>
      {acceptedorders.map((order) => (
         <OrderTrain key={ order.trainno+order.destination } order={order} />
      ))}
      {acceptedorders.length===0 && <p className='mt-3'>No accepted Tickets</p>}
      </div>
      <h4>Rejected Tickets</h4>
      <div className='container'>
      {rejectedorders.map((order) => (
        <OrderTrain key={ order.trainno+order.destination } order={order} />
      ))}
      {rejectedorders.length===0 && <p className='mt-3'>No rejected Tickets</p>}
      </div>
    </div>
  )
}

export default Myorders