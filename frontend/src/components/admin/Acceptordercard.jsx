import React from 'react'
import { rerenderActions } from '../../store/rerender'; 
import {useDispatch} from 'react-redux';

const Acceptordercard = (props) => {
    const {order} = props;
    const dispatch = useDispatch();
    async function handleAccept(){
        const data = {
            trainno :order.trainno,
            email:order.email,
            origin:order.origin,
            destination:order.destination
        }
        await fetch('http://localhost:8000/acceptorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        dispatch(rerenderActions.rerender());
    }

    async function handleReject(){
        const data = {
            trainno :order.trainno,
            email:order.email,
            origin:order.origin,
            destination:order.destination
        }
        await fetch('http://localhost:8000/rejectorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        dispatch(rerenderActions.rerender());
    }
    
    return (
        <div  className=' m-3 p-2 d-flex' style={{border:"1px solid black",borderRadius:"10px"}} >
          <div>
            <p>Train name :  {order.name}</p>
            <p>Origin: {order.origin} --- Destination: {order.destination} </p>
            <p>price : {order.price} </p>
          </div>
          <div className='ms-auto my-auto'>
                <button className='btn btn-danger m-2' onClick={handleAccept}  >accept</button>
                <button className='btn btn-danger m-2' onClick={handleReject} >reject</button>
          </div>
        </div>
    )
}

export default Acceptordercard