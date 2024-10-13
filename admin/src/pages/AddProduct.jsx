import React, { useEffect, useState } from 'react';
import '../css/AddProduct.css';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProduct = ({ url }) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: ""  // Default can be set later after fetching
    });
    const [categories, setCategories] = useState([]);  // State for categories

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((prevData) => ({ ...prevData, [name]: value }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: categories.length > 0 ? categories[0] : ""  // Reset to first category
            });
            setImage(false);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    }

    // Fetch categories from the backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${url}/api/categories/list`);  // Adjust this endpoint as necessary
                if (response.data.success) {
                    setCategories(response.data.data);
                    setData((prevData) => ({
                        ...prevData,
                        category: response.data.data[0]  // Set default category to the first one
                    }));
                }
            } catch (error) {
                toast.error("Failed to fetch categories");
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-image-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Product Name' required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Product description' required></textarea>
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" value={data.category}>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>  // Assuming `cat` has `id` and `name`
                            ))}
                        </select>
                    </div>

                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder='£ 0' required />
                    </div>
                </div>
                <button type="submit" className='add-button'>Add</button>
            </form>
        </div>
    );
}

export default AddProduct;
