import React, { useContext } from 'react';
import '../css/FoodItem.css';
import { assets } from '../assets/assets';
import { StoreContext } from '../context/StoreContext';
import { toast } from 'react-toastify';

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    const handleAddToCart = (id) => {
        addToCart(id);
        toast.success(`${name} has been added to your cart!`);
    };

    return (
        <div className='food-item'>
            <div className='food-item-image-container'>
                <img className='food-item-image' src={url + "/images/" + image} alt={name} />
                {cartItems[id] === undefined ? (
                    <img
                        className='add'
                        onClick={() => handleAddToCart(id)}
                        src={assets.add_icon_white}
                        alt="Add to cart"
                    />
                ) : (
                    <div className='food-item-counter'>
                        <img
                            onClick={() => removeFromCart(id)}
                            src={assets.remove_icon_red}
                            alt="Remove from cart"
                        />
                        <p>{cartItems[id]}</p>
                        <img
                            onClick={() => addToCart(id)}
                            src={assets.add_icon_green}
                            alt="Add more"
                        />
                    </div>
                )}
            </div>
            <div className='food-item-info'>
                <div className='food-item-name-rating'>
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating stars" />
                </div>
                <p className='food-item-desc'>{description}</p>
                <p className='food-item-price'>£ {price} </p>
            </div>
        </div>
    );
}

export default FoodItem;
