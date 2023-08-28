import {useDispatch} from 'react-redux';
import { rerenderActions } from '../../store/rerender';

export default function OrderTrain(props){
    const {order} = props;
    const dispatch = useDispatch();
    async function handleCancel(){
        const data = {
            trainno :order.trainno,
            email:localStorage.getItem("email"),
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
        <div  className=' m-3 p-4 d-flex' style={{border:"1px solid black",borderRadius:"10px"}} >
          <div>
            <p>Train name :  {order.name}</p>
            <p>Origin: {order.origin} --- Destination: {order.destination} </p>
          </div>
          <div className='ms-auto my-auto'>
            {order.status !==3 && <button className='btn btn-danger' onClick={handleCancel}>cancel</button>}
          </div>
        </div>
        

    )
}