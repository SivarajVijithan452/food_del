import React, { useContext } from 'react';
import '../../css/Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleRemoveFromCart = (itemId, itemName) => {
        removeFromCart(itemId);
        toast.success(`${itemName} has been removed from your cart!`);
    };

    return (
        <div className='cart'>
            <div className='cart-items'>
                <div className='cart-items-title'>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={item._id}>
                                <div className='cart-items-title cart-items-item'>
                                    <img src={url + "/images/" + item.image} alt={item.name} />
                                    <p>{item.name}</p>
                                    <p>£ {item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>£ {item.price * cartItems[item._id]}</p>
                                    <p onClick={() => handleRemoveFromCart(item._id, item.name)} className='cross'>x</p>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null; // Return null if item is not in cart
                })}
            </div>
            <div className='cart-bottom'>
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
                    <button onClick={() => navigate('/order')}>CheckOut</button>
                </div>
                <div className='cart-promo-code'>
                    <div>
                        <p>If you have a promo code, Enter here!</p>
                        <div className='cart-promocode-input'>
                            <input type="text" placeholder='Enter your promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
