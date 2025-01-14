import React from 'react'
import { FaLaptop, FaBriefcase, FaHospital, FaFutbol, FaFilm, FaGraduationCap, FaTshirt, FaHamburger } from 'react-icons/fa';

const Categories: React.FC = () => {
    const categories = [
        { id: 1, name: 'Technology', icon: <FaLaptop /> },
        { id: 2, name: 'Business', icon: <FaBriefcase /> },
        { id: 3, name: 'Health', icon: <FaHospital /> },
        { id: 4, name: 'Sports', icon: <FaFutbol /> },
        { id: 5, name: 'Entertainment', icon: <FaFilm /> },
        { id: 6, name: 'Education', icon: <FaGraduationCap /> },
        { id: 7, name: 'Fashion', icon: <FaTshirt /> },
        { id: 8, name: 'Food', icon: <FaHamburger /> },
    ];
    return (
        <div className='pt-16'>
            <div className="py-8 px-4 bg-gray-50 h-screen">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Browse Categories</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="text-4xl mb-4">{category.icon}</div>
                            <h3 className="text-xl font-medium text-gray-700">{category.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Categories;
