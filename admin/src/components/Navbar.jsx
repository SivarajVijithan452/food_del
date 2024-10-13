import React from 'react'
import '../css/Navbar.css';
import { assets } from '../../src/assets/assets';

const Navbar = () => {
    return (
        <div className='navbar'>
            <img className='logo' src={assets.logo} alt="" />
            <img className='profile' src={assets.profile_image} alt="" />
        </div>
    )
}

export default Navbar
