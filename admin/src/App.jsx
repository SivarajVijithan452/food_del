import React from 'react'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import { Routes, Route } from 'react-router-dom'
import AddProduct from './pages/AddProduct';
import ListProduct from './pages/ListProduct';
import Orders from './pages/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Category from './pages/Category';

const App = () => {
  const url = "http://localhost:4000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='app-content'>
        <SideBar />
        <Routes>
          <Route path="/add" element={<AddProduct url={url} />} />
          <Route path="/list" element={<ListProduct url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/categories" element={<Category url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
