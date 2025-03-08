import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../../Sections/Header";
import Footer from "../../../Sections/Footer";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCartItems();
    }, []);

    // Fetch Cart Items
    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem("user_auth_token"); // User authentication token

            console.log(token);
            const response = await axios.get("http://localhost:8000/api/cart", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCartItems(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching cart items:", error);
            setError("Failed to load cart items.");
            setLoading(false);
        }
    };

    // Update Quantity
    const updateQuantity = async (id, quantity) => {
        if (quantity < 1) return;

        try {
            const token = localStorage.getItem("user_auth_token");
            await axios.put(`http://localhost:8000/api/cart/update/${id}`, { quantity }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity } : item));
            toast.success("✅ Quantity updated!", { position: "top-right", autoClose: 2000 });
        } catch (error) {
            console.error("Error updating quantity:", error);
            toast.error("❌ Failed to update quantity.");
        }
    };

    // Remove Cart Item
    const removeCartItem = async (id) => {
        try {
            const token = localStorage.getItem("user_auth_token");
            await axios.delete(`http://localhost:8000/api/cart/remove/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setCartItems(cartItems.filter(item => item.id !== id));
            toast.success("🗑️ Item removed from cart!", { position: "top-right", autoClose: 2000 });
        } catch (error) {
            console.error("Error removing cart item:", error);
            toast.error("❌ Failed to remove item.");
        }
    };

    // Clear Entire Cart
    const clearCart = async () => {
        try {
            const token = localStorage.getItem("user_auth_token");
            await axios.delete("http://localhost:8000/api/cart/clear", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setCartItems([]);
            toast.success("🛒 Cart cleared!", { position: "top-right", autoClose: 2000 });
        } catch (error) {
            console.error("Error clearing cart:", error);
            toast.error("❌ Failed to clear cart.");
        }
    };

    if (loading) return <p className="text-lg text-gray-600 font-semibold text-center py-10">Loading cart items...</p>;
    if (error) return <p className="text-lg text-red-500 font-semibold text-center py-10">{error}</p>;
    if (cartItems.length === 0) return <p className="text-lg text-gray-600 font-semibold text-center py-10">Your cart is empty.</p>;

    return (
        <>
        <Header />
        <div className="container mx-auto p-4 md:p-6">
            <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

            {/* Cart Table */}
            <div className="bg-white p-6 shadow-md rounded-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3 text-left">Product</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Quantity</th>
                            <th className="p-3 text-left">Total</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item.id} className="border-t">
                                <td className="p-3 flex items-center gap-3">
                                    <img src={item.product_img} alt={item.product_name} className="w-20 h-auto rounded" />
                                    <span>{item.product_name}</span>
                                </td>
                                <td className="p-3">${item.product_price}</td>
                                <td className="p-3">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                        min="1"
                                        className="border border-gray-300 p-2 w-20 text-center rounded-md"
                                    />
                                </td>
                                <td className="p-3 font-semibold">${(item.product_price * item.quantity).toFixed(2)}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => removeCartItem(item.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Cart Actions */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={clearCart}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold"
                >
                    Clear Cart
                </button>
                <button
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default Cart;
