import React, { useContext, useEffect, useState } from 'react';
import '../../css/MyOrders.css';
import { StoreContext } from './../../context/StoreContext';
import axios from 'axios';
import { assets } from './../../assets/assets';

const MyOrders = () => {
    const [data, setData] = useState([]);
    const { url } = useContext(StoreContext);

    const userId = localStorage.getItem("userId");

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", { userId });
            setData(response.data.data || []);
            // console.log(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    useEffect(() => {
        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    return (
        <div className="my-orders">
            <h2>Your Orders</h2>
            <div className='container'>
                {data.map((order, index) => {
                    return (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + " x " + item.quantity
                                }
                                else {
                                    return item.name + " x " + item.quantity + " , "
                                }
                            })}</p>
                            <p>£ {order.amount}</p>
                            <p>Items: {order.items.length}</p>
                            <p><b>Status: {order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default MyOrders;
