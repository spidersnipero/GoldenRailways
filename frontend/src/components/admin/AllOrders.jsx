import React from 'react'
import { useEffect,useState } from 'react'
import Acceptordercard from './Acceptordercard'
import { useSelector } from 'react-redux'


const AdminAllOrders = () => {

    const [waitingorders, setWaitingorders] = useState([]);
    const rerun = useSelector(state => state.rerender.val);
    useEffect(() => {
        setWaitingorders([]);
        const fetchData = async () => {
            const response = await fetch('http://localhost:8000/allorders')
            const data = await response.json()
            console.log(data)
            setWaitingorders(data)
        }
        fetchData()
    }, [rerun])


    return (
        <div className='container mt-4'>
            <h2>Pending orders</h2>
            <div className='container'>
                {waitingorders.map((order) => (
                <Acceptordercard key={order.trainno + order.destination} order={order} />
                    ))}
                {waitingorders.length===0 && <h1 className='mt-5'>No pending orders</h1>}
            </div>
            
        </div>
    )
}

export default AdminAllOrders