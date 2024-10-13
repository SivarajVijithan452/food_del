import React from 'react';
import '../css/ExploreMenu.css';
import { menu_list } from '../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore Our Menu</h1>
            <p className='explore-menu-text'>
                Discover a wide variety of dishes crafted with fresh ingredients and
                unique flavors. Whether you're in the mood for savory entrees,
                delectable desserts, or refreshing beverages, our menu has something
                for everyone. Dive in and find your new favorites!
            </p>
            <div className='explore-menu-list'>
                {
                    menu_list.map((item, index) => {
                        return (
                            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item'>
                                <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} />
                                <p>{item.menu_name}</p>
                            </div>
                        )
                    })
                }
            </div>
            <hr />
        </div>
    );
}

export default ExploreMenu;
