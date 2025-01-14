import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-200 shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <a href="/" className="text-xl font-bold text-gray-800">
                            E-Shop
                        </a>
                    </div>
                    <div className="hidden md:flex flex-grow mx-6">
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
                            Search
                        </button>
                    </div>

                    <div className="flex gap-10">
                        <div className="hidden md:flex items-center space-x-6">
                            <Link to="/categories"
                                className="text-gray-600 hover:text-gray-800 font-medium"
                            >
                                Categories
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-4 gap-10">
                            <Link to="/"
                                className="text-gray-600 hover:text-gray-800 font-medium"
                            >
                                Home
                            </Link>
                            <Link to="/login"
                                className="text-gray-600 hover:text-gray-800 font-medium"
                            >
                                Login
                            </Link>
                            <Link to="/cart"
                                className="relative text-gray-600 hover:text-gray-800 font-medium"
                            >
                                Cart
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                                    3
                                </span>
                            </Link>
                            <Link to="/profile"
                                className="text-gray-600 hover:text-gray-800 font-medium"
                            >
                                Profile
                            </Link>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m-7 6h7"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
                <div className="px-4 pt-4 pb-3 space-y-1">
                    <Link onClick={() => setIsOpen(false)} to="/"
                        className="text-gray-600 hover:text-gray-800 font-medium"
                    >
                        Home
                    </Link>
                    <Link onClick={() => setIsOpen(false)} to="/categories"
                        className="text-gray-600 hover:text-gray-800 font-medium"
                    >
                        Categories
                    </Link>
                    <Link onClick={() => setIsOpen(false)}
                        to='/login'
                        className="block text-gray-600 hover:text-gray-800 font-medium"
                    >
                        Login
                    </Link>
                    <Link onClick={() => setIsOpen(false)}
                        to='/cart'
                        className="block text-gray-600 hover:text-gray-800 font-medium"
                    >
                        Cart
                    </Link>
                    <Link onClick={() => setIsOpen(false)} to='/profile'
                        className="block text-gray-600 hover:text-gray-800 font-medium"
                    >
                        Profile
                    </Link>
                </div>
                <div className="px-4 py-2">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
