import React, { useEffect, useState } from 'react';
import '../css/ListProduct.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from '../components/Modal';

const ListProduct = ({ url }) => {
    const [list, setList] = useState([]);
    const [categories, setCategories] = useState([]); // State for categories
    const [editItem, setEditItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null
    });
    const [modalOpen, setModalOpen] = useState(false);

    // Fetch food list
    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error(response.data.message);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        const response = await axios.get(`${url}/api/categories/list`);
        if (response.data.success) {
            setCategories(response.data.data);
        } else {
            toast.error(response.data.message);
        }
    };

    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            image: null
        });
        setModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('id', editItem._id);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('category', formData.category);
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        const response = await axios.post(`${url}/api/food/update`, formDataToSend);
        if (response.data.success) {
            toast.success(response.data.message);
            setModalOpen(false);
            fetchList();
        } else {
            toast.error(response.data.message);
        }
    };

    useEffect(() => {
        fetchList();
        fetchCategories(); // Fetch categories when component mounts
    }, []);

    return (
        <div className='list add flex-col'>
            <p>All Product List</p>
            <div className='list-table'>
                <div className='list-table-format title'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => (
                    <div key={index} className='list-table-format'>
                        <img src={`${url}/images/` + item.image} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>£ {item.price}</p>
                        <div className='action-column'>
                            <p onClick={() => removeFood(item._id)} className='cursor'>x</p>
                            <p onClick={() => handleEdit(item)} className='cursor'>Edit</p>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleUpdate}
                formData={formData}
                setFormData={setFormData}
                categories={categories} // Pass the categories array to Modal
            />
        </div>
    );
};

export default ListProduct;
