import React from 'react'
import Navbar from '../layouts/Navbar';
import Sidebar from '../layouts/Sidebar';

function ProductList() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <div className="flex-1 bg-gray-200">
                <Navbar />
                {/* Dashboard Content */}
                <div className="p-6">
                    <h1 className="text-3xl font-semibold text-gray-700">
                        Welcome to the Admin Dashboard
                    </h1>
                    <p className="mt-4 text-gray-600">
                        Here you can manage users, check reports, and configure settings.
                    </p>

                    {/* Summary Boxes */}
                    <div className="mt-6">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white shadow-md p-4 rounded-lg">
                                <h3 className="text-xl font-semibold">Total Users</h3>
                                <p className="text-2xl">1,230</p>
                            </div>
                            <div className="bg-white shadow-md p-4 rounded-lg">
                                <h3 className="text-xl font-semibold">Active Orders</h3>
                                <p className="text-2xl">54</p>
                            </div>
                            <div className="bg-white shadow-md p-4 rounded-lg">
                                <h3 className="text-xl font-semibold">Reports Pending</h3>
                                <p className="text-2xl">12</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList
