import React, { useContext, useState } from 'react';
import '../css/LoginPopup.css';
import { assets } from '../assets/assets';
import { StoreContext } from './../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken, loadCartData } = useContext(StoreContext);
    const [currentState, setCurrentState] = useState("Sign Up");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = `${url}/api/user/${currentState === "Login" ? "login" : "register"}`;

        try {
            const response = await axios.post(newUrl, data);
            console.log(response.data); // Log the response

            if (response.data.status) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("userRole", response.data.userRole); // Store userRole

                // Redirect based on userRole
                if (response.data.userRole === "admin") {
                    window.location.href = "http://localhost:5174/";
                } else {
                    window.location.href = "http://localhost:5173/";
                }

                setShowLogin(false);
                toast.success(`${currentState === "Login" ? "Login" : "Sign Up"} successful!`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed. Please try again.");
        }
    };


    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currentState}</h2>
                    <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
                </div>
                <div className='login-popup-input'>
                    {currentState === "Login" ? null :
                        <input
                            type="text"
                            name="name"
                            onChange={onChangeHandler}
                            value={data.name}
                            placeholder='Enter Your Name'
                            required
                        />
                    }
                    <input
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder='Enter Your Email'
                        required
                    />
                    <input
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder='Enter Your Password'
                        required
                    />
                </div>
                <button type="submit">{currentState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className='login-popup-condition'>
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {currentState === "Login" ? (
                    <p>Create a new account?<span onClick={() => setCurrentState("Sign Up")}> Click Here!</span></p>
                ) : (
                    <p>Already have an account?<span onClick={() => setCurrentState("Login")}> Login here</span></p>
                )}
            </form>
        </div>
    );
}

export default LoginPopup;
