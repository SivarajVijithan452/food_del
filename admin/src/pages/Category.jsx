import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../css/Category.css';

const Category = ({ url }) => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({ name: '' });
    const [editItem, setEditItem] = useState(null);

    const fetchCategories = async () => {
        const response = await axios.get(`${url}/api/categories/list`);
        if (response.data.success) {
            setCategories(response.data.data);
        } else {
            toast.error(response.data.message);
        }
    };

    const handleAddEdit = async (e) => {
        e.preventDefault();
        if (editItem) {
            const response = await axios.post(`${url}/api/categories/update`, { id: editItem._id, name: formData.name });
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } else {
            const response = await axios.post(`${url}/api/categories/add`, formData);
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        }
        setEditItem(null);
        setFormData({ name: '' });
        fetchCategories();
    };

    const handleEdit = (category) => {
        setEditItem(category);
        setFormData({ name: category.name });
    };

    const handleDelete = async (id) => {
        const response = await axios.post(`${url}/api/categories/remove`, { id });
        if (response.data.success) {
            toast.success(response.data.message);
            fetchCategories();
        } else {
            toast.error(response.data.message);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className='category-container'>
            <h3>Manage Categories</h3>
            <form onSubmit={handleAddEdit}>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ name: e.target.value })}
                    required
                />
                <button type="submit">{editItem ? 'Update' : 'Add'} Category</button>
            </form>
            <div className='category-list'>
                {categories.map((category) => (
                    <div key={category._id} className='category-item'>
                        <p>{category.name}</p>
                        <button onClick={() => handleEdit(category)}>Edit</button>
                        <button onClick={() => handleDelete(category._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
