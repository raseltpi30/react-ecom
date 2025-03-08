import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../layouts/Navbar';
import Sidebar from '../layouts/Sidebar';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        sale_percentage: '',
    });
    const [image, setImage] = useState(null);
    const [authToken, setAuthToken] = useState('');

    // Get auth token from local storage (Admin must be logged in)
    useEffect(() => {
        const token = localStorage.getItem('admin_auth_token');
        if (token) {
            setAuthToken(token);
        }
    }, []);

    // Handle text input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle image input separately
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('category', formData.category);
        formDataObj.append('img', image);
        formDataObj.append('price', formData.price);
        formDataObj.append('quantity', formData.quantity);
        formDataObj.append('sale_percentage', formData.sale_percentage);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/products', formDataObj, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                toast.success("Product added successfully!");
                setFormData({ name: '', category: '', price: '',quantity: '', sale_percentage: '' });
                setImage(null);
                document.getElementById('imgInput').value = ''; // Reset file input
            }
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            toast.error(error.response?.data?.message || "Failed to add product.");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 bg-gray-200 p-6">
                <Navbar />
                <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Product</h2>

                    {/* Toastr Notification Container */}
                    <ToastContainer position="top-right" autoClose={3000} />

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-4">
                            <label className="block text-gray-700">Product Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Category</label>
                            <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>

                        

                        <div className="mb-4">
                            <label className="block text-gray-700">Price</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Quantity</label>
                            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full p-2 border rounded" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Sale Percentage</label>
                            <input type="number" name="sale_percentage" value={formData.sale_percentage} onChange={handleChange} className="w-full p-2 border rounded" min="0" max="100" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Image</label>
                            <input type="file" id="imgInput" name="img" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
                        </div>

                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;
