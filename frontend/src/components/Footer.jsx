import React from 'react';
import '../css/Footer.css';
import { assets } from '../assets/assets';

const Footer = () => {
    const currentYear = new Date().getFullYear(); // Get the current year

    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className='footer-content-left'>
                    <img src={assets.logo_company} alt="Company Logo" />
                    <p>We Bring Your Favourite!</p>
                    <div className='footer-social-icons'>
                        <img src={assets.facebook_icon} alt="Facebook" />
                        <img src={assets.twitter_icon} alt="Twitter" />
                        <img src={assets.linkedin_icon} alt="LinkedIn" />
                    </div>
                </div>
                <div className='footer-content-center'>
                    <h2>FoodFlix PVT LTD</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h2>Get In Touch</h2>
                    <ul>
                        <li>+94 76 356 9121</li>
                        <li>contact@foodflix.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>Copyright {currentYear} FoodFlix.com - All Rights Reserved</p>
            <p>Developed By: sVijithan</p>
        </div>
    );
}

export default Footer;
