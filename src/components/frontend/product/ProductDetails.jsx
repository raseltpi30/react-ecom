import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../../Sections/Header";
import Footer from "../../../Sections/Footer";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setLoading(true);

        // Fetch Product Details
        axios.get(`http://localhost:8000/api/user/products/${id}`)
            .then(response => {
                setProduct(response.data);

                // Fetch Related Products by Category
                return axios.get(`http://localhost:8000/api/user/products?category=${response.data.category}`);
            })
            .then(res => {
                setRelatedProducts(res.data.filter(item => item.id !== parseInt(id))); // Exclude current product
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching product:", error);
                setError("Failed to load product details.");
                setLoading(false);
            });

    }, [id]);

    // Handle Quantity Change
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0) {
            setQuantity(value);
        }
    };

    // Handle Add to Cart (Using Laravel API)
    const addToCart = async () => {
        try {
            const token = localStorage.getItem("user_auth_token"); // User authentication token
            const response = await axios.post("http://localhost:8000/api/cart/add", {
                product_id: product.id,
                quantity: quantity
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("🛒 Product added to cart!", { position: "top-right", autoClose: 2000 });
            navigate("/cart"); // Redirect to Cart Page

        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("❌ Failed to add product to cart.");
        }
    };

    if (loading) return <p className="text-lg text-gray-600 font-semibold text-center py-10">Loading product details...</p>;
    if (error) return <p className="text-lg text-red-500 font-semibold text-center py-10">{error}</p>;
    if (!product) return <p className="text-lg text-gray-600 font-semibold text-center py-10">Product not found.</p>;

    return (
        <>
        <Header />
        <div className="container mx-auto p-4 md:p-6">
            
            {/* ✅ Product Details Section */}
            <div className="bg-white p-6 shadow-md rounded-lg flex flex-col md:flex-row gap-10">
                {/* Left - Product Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img
                        src={`http://localhost:8000/uploads/products/${product.img}`}
                        alt={product.name}
                        className="w-full max-w-[400px] h-auto object-cover rounded-lg"
                    />
                </div>

                {/* Right - Product Information */}
                <div className="w-full md:w-1/2 flex flex-col gap-3">
                    <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
                    <p className="text-gray-500 text-lg">{product.category}</p>
                    <p className="text-2xl text-green-500 font-semibold">${product.price}</p>

                    <p className="text-gray-700 text-sm md:text-base">{product.description}</p>

                    {/* ✅ Quantity Input */}
                    <div className="flex items-center gap-3 mt-3">
                        <label htmlFor="quantity" className="text-lg font-semibold">Quantity:</label>
                        <input 
                            type="number" 
                            id="quantity" 
                            value={quantity} 
                            onChange={handleQuantityChange} 
                            min="1"
                            className="border border-gray-300 p-2 w-20 text-center rounded-md"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col md:flex-row gap-4 mt-6">
                        <button 
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold w-full md:w-auto"
                        >
                            Buy Now
                        </button>
                        <button 
                            onClick={addToCart}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-semibold w-full md:w-auto"
                        >
                            Add to Cart
                        </button>
                    </div>

                    <Link to="/" className="mt-4 text-blue-500 text-lg font-semibold hover:underline">
                        ← Back to Home
                    </Link>
                </div>
            </div>

            {/* ✅ Related Products Section */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Related Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transform hover:-translate-y-1 transition-all"
                                onClick={() => navigate(`/product/${item.id}`)}
                            >
                                <img src={item.img} alt={item.name} className="w-[200px] h-auto object-cover rounded-md text-center m-auto" />
                                <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                                <p className="text-gray-500">{item.category}</p>
                                <p className="text-green-500 font-semibold">${item.price}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No related products found.</p>
                    )}
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default ProductDetails;
