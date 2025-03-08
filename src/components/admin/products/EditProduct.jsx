import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../layouts/Navbar';
import Sidebar from '../layouts/Sidebar';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate();
    const authToken = localStorage.getItem('admin_auth_token');

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        sale_percentage: '',
    });
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('');

    // Fetch product details when component mounts
    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`, {
                headers: { 'Authorization': `Bearer ${authToken}` },
            });
            setFormData({
                name: response.data.name,
                category: response.data.category,
                price: response.data.price,
                quantity: response.data.quantity,
                sale_percentage: response.data.sale_percentage,
            });
            setPreviewImage(`http://127.0.0.1:8000/uploads/products/${response.data.img}`);
        } catch (error) {
            console.error('Error fetching product:', error);
            toast.error('Failed to load product details.');
        }
    };

    // Handle text input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle image input
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file)); // Show preview of new image
        }
    };

    // Handle form submission (update product)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('category', formData.category);
        formDataObj.append('price', formData.price);
        formDataObj.append('quantity', formData.quantity);
        formDataObj.append('sale_percentage', formData.sale_percentage);
        if (image) formDataObj.append('img', image); // Append only if a new image is uploaded

        try {
            await axios.post(`http://127.0.0.1:8000/api/products/${id}?_method=PUT`, formDataObj, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Product updated successfully!');

            // ✅ Delay navigation to allow toast message to show
            setTimeout(() => {
                navigate('/admin/products');
            }, 3000); // 2-second delay

        } catch (error) {
            console.error('Error updating product:', error);
            toast.error(error.response?.data?.message || 'Failed to update product.');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 bg-gray-200 p-6">
                <Navbar />
                <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Product</h2>

                    {/* Toast Notification */}
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
                            <label className="block text-gray-700">Current Image</label>
                            {previewImage && <img src={previewImage} alt="Product" className="h-20 mx-auto mb-2" />}
                            <input type="file" id="imgInput" name="img" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
                        </div>

                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;
