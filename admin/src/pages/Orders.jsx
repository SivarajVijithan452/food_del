import React, { useState, useEffect } from 'react';
import '../css/Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(url + "/api/order/listorders");
            if (response.data.success) {
                setOrders(response.data.data);
                // console.log(response.data.data);
            } else {
                console.log(response.data.message);
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Failed to fetch orders.");
        }
    };

    const statusHandler = async (event, orderId) => {
        const response = await axios.post(url + "/api/order/status", {
            orderId,
            status: event.target.value
        });
        if (response.data.success) {
            await fetchAllOrders();
            toast.success("Order status updated successfully.");
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className='order add'>
            <h3>Orders</h3>
            <div className='order-list'>
                {orders.map((order, index) => (
                    <div key={index} className='order-item'>
                        <img src={assets.parcel_icon} alt="" />
                        <div>
                            <p className='order-item-product'>
                                {order.items.map((item, idx) => (
                                    <span key={idx}>
                                        {item.name} x {item.quantity}{idx < order.items.length - 1 ? ", " : ""}
                                    </span>
                                ))}
                            </p>
                            <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
                            <div className='order-item-address'>
                                <p>{order.address.street + " , "}</p>
                                <p>{order.address.city + " , " + order.address.state + " , " + order.address.country + " , " + order.address.zipcode}</p>
                            </div>
                            <p className='order-item-phone'>{order.address.phone}</p>
                        </div>
                        <p>Items : {order.items.length}</p>
                        <p>£ {order.amount}</p>
                        <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
