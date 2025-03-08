import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../layouts/Navbar';
import Sidebar from '../layouts/Sidebar';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const authToken = localStorage.getItem('admin_auth_token');

    // Fetch products from API
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/products', {
                headers: { 'Authorization': `Bearer ${authToken}` },
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to load products.');
        }
    };

    // Delete product
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/products/${id}`, {
                headers: { 'Authorization': `Bearer ${authToken}` },
            });
            toast.success('Product deleted successfully!');
            fetchProducts(); // Refresh list after deletion
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Failed to delete product.');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 bg-gray-200 p-6">
                <Navbar />
                <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Product List</h2>

                    {/* Toast Notification */}
                    <ToastContainer position="top-right" autoClose={3000} />

                    <div className="overflow-x-auto">
                        <table className="min-w-full w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="py-2 px-4 border">Image</th>
                                    <th className="py-2 px-4 border">Name</th>
                                    <th className="py-2 px-4 border">Category</th>
                                    <th className="py-2 px-4 border">Price</th>
                                    <th className="py-2 px-4 border">Quantity</th>
                                    <th className="py-2 px-4 border">Sale %</th>
                                    <th className="py-2 px-4 border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length > 0 ? (
                                    products.map(product => (
                                        <tr key={product.id} className="border text-center">
                                            <td className="py-2 px-4 border">
                                                <img src={`${product.img}`} alt={product.name} className="h-16 mx-auto" />
                                            </td>
                                            <td className="py-2 px-4 border">{product.name}</td>
                                            <td className="py-2 px-4 border">{product.category}</td>
                                            <td className="py-2 px-4 border">${product.price}</td>
                                            <td className="py-2 px-4 border">{product.quantity}</td>
                                            <td className="py-2 px-4 border">{product.sale_percentage}%</td>
                                            <td className="py-2 px-4 border">
                                                <button onClick={() => navigate(`/products/${product.id}`)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Show</button>
                                                <button onClick={() => navigate(`/admin/products/edit/${product.id}`)} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                                                <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-4 text-center">No products found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;
