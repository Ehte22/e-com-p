import React from "react";
import { useNavigate } from "react-router-dom";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

const Product: React.FC = () => {
    const products: Product[] = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 149.99,
            image:
                "https://images.unsplash.com/photo-1592496011071-7d7e68353e90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGhlYWRwaG9uZXN8ZW58MHx8fHwxNjc0NTM0Mjk0&ixlib=rb-4.0.3&q=80&w=1080",
        },
        {
            id: 2,
            name: "Smart Watch",
            price: 99.99,
            image:
                "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8fHwxNjc0NTM0MzI2&ixlib=rb-4.0.3&q=80&w=1080",
        },
        {
            id: 3,
            name: "Bluetooth Speaker",
            price: 89.99,
            image:
                "https://images.unsplash.com/photo-1583224207923-b3e636a91d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHNwZWFrZXJ8ZW58MHx8fHwxNjc0NTM0MzY3&ixlib=rb-4.0.3&q=80&w=1080",
        },
        {
            id: 4,
            name: "Gaming Controller",
            price: 59.99,
            image:
                "https://images.unsplash.com/photo-1612075462559-d2a84c2db7c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDZ8fGdhbWluZyUyMGNvbnRyb2xsZXJ8ZW58MHx8fHwxNjc0NTM0NDA1&ixlib=rb-4.0.3&q=80&w=1080",
        },
    ];
    const navigate = useNavigate()
    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Featured Products</h1>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white shadow rounded-lg overflow-hidden flex flex-col"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4 flex-grow">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {product.name}
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    ${product.price.toFixed(2)}
                                </p>
                            </div>
                            <div className="p-4 border-t flex flex-col gap-2">
                                <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700">
                                    Add to Cart
                                </button>
                                <button onClick={() => navigate("/details/934398")} className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-300">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Product;
