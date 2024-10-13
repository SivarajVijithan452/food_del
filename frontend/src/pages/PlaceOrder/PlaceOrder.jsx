import React, { useContext, useEffect, useState } from 'react';
import '../../css/PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });
    const navigate = useNavigate();


    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();

        // Get userId from local storage
        const userId = localStorage.getItem("userId");

        // Check if userId is defined
        if (!userId) {
            toast.error("User ID not found.");
            return;
        }
        console.log('User ID:', userId); // Log userId

        // Build order items
        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            userId, // Directly using userId from local storage
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 20,
        };

        console.log('Order Data:', orderData); // Log order data

        try {
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            }
        } catch (error) {
            console.log(error);
            toast.error("Payment process not complete!!");
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/cart');
            toast.error("Please Login and add products to Checkout");
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart');
            toast.error("Please add some products to checkout!!!");

        }
    }, [token])

    return (
        <form className='place-order' onSubmit={placeOrder}>
            <div className='place-order-left'>
                <p className='title'>Delivery Information</p>
                <div className='multi-fields'>
                    <input
                        name="firstName"
                        onChange={onChangeHandler}
                        type="text"
                        placeholder='First Name'
                        value={data.firstName}
                        required
                    />
                    <input
                        name="lastName"
                        onChange={onChangeHandler}
                        type="text"
                        placeholder='Last Name'
                        value={data.lastName}
                        required
                    />
                </div>
                <input
                    name="email"
                    onChange={onChangeHandler}
                    type="email"
                    placeholder='Email Address'
                    value={data.email}
                    required
                />
                <input
                    name="street"
                    onChange={onChangeHandler}
                    type="text"
                    placeholder='Address'
                    value={data.street}
                    required
                />
                <div className='multi-fields'>
                    <input
                        name="city"
                        onChange={onChangeHandler}
                        type="text"
                        placeholder='City'
                        value={data.city}
                        required
                    />
                    <input
                        name="state"
                        onChange={onChangeHandler}
                        type="text"
                        placeholder='State'
                        value={data.state}
                        required
                    />
                </div>
                <div className='multi-fields'>
                    <input
                        name="zipcode"
                        onChange={onChangeHandler}
                        type="text"
                        placeholder='Zip Code'
                        value={data.zipcode}
                        required
                    />
                    <input
                        name="country"
                        onChange={onChangeHandler}
                        type="text"
                        placeholder='Country'
                        value={data.country}
                        required
                    />
                </div>
                <input
                    name="phone"
                    onChange={onChangeHandler}
                    type="text"
                    placeholder='Phone'
                    value={data.phone}
                    required
                />
            </div>
            <div className='place-order-right'>
                <div className='cart-total'>
                    <h2>Cart Total</h2>
                    <div>
                        <div className='cart-total-details'>
                            <p>Sub Total</p>
                            <p>£ {getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <p>Delivery Fee</p>
                            <p>£ {getTotalCartAmount() === 0 ? 0 : 20}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <b>Total</b>
                            <b>£ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
                        </div>
                    </div>
                    <button type="submit">Pay</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
