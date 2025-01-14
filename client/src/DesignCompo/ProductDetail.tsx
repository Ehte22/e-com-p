// ProductDetail.tsx

import React, { useState } from 'react';

type Product = {
    title: string;
    description: string;
    price: number;
    images: string[];
    ratings: number;
    specifications: string[];
    reviews: { id: number; text: string }[];
};

const productData: Product = {
    title: 'Stylish Mobiles',
    description: 'A portable Bluetooth speaker with excellent sound quality and long battery life.',
    price: 99.99,
    images: [
        'https://plus.unsplash.com/premium_photo-1681680199361-bd62dc8de311?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1533022139390-e31c488d69e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vYmlsZXxlbnwwfHwwfHx8MA%3D%3D',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    ratings: 4,
    specifications: [
        'Mobile 5.0',
        'Waterproof (IPX7)',
        '12 hours battery life',
        'Built-in microphone',
    ],
    reviews: [
        { id: 1, text: 'Great sound quality, really impressed!' },
        { id: 2, text: 'Love it, but battery could last longer.' },
        { id: 3, text: 'Perfect speaker for travel!' },
    ],
};

const ProductDetail: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string>(productData.images[0]);
    const [quantity, setQuantity] = useState<number>(1);

    return (
        <div className="max-w-7xl mx-auto py-12 px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left Column: Product Images */}
                <div>
                    <div className="mb-6">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1681666713741-3e307db44f68?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vYmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                            alt="Product"
                            className="w-full h-auto rounded-lg shadow-lg object-cover"
                        />
                    </div>
                    <div className="flex space-x-4">
                        {productData.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Product Thumbnail ${index + 1}`}
                                className="w-24 h-24 object-cover cursor-pointer rounded-lg shadow-md"
                                onClick={() => setSelectedImage(image)}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Column: Product Details */}
                <div>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">{productData.title}</h2>
                    <div className="flex items-center space-x-2 mb-6">
                        <span className="text-yellow-400">{"★".repeat(productData.ratings)}</span>
                        <span className="text-gray-500">({productData.reviews.length} reviews)</span>
                    </div>
                    <p className="text-lg text-gray-700 mb-6">{productData.description}</p>

                    <div className="mb-6">
                        <p className="text-xl font-semibold text-gray-900">${productData.price}</p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                            min={1}
                            className="w-16 border border-gray-300 p-2 rounded-md"
                        />
                    </div>

                    {/* Add to Cart Button */}
                    <button className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition">
                        Add to Cart
                    </button>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Specifications</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            {productData.specifications.map((spec, index) => (
                                <li key={index}>{spec}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Customer Reviews */}
            <div className="mt-12">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Customer Reviews</h3>
                <div className="space-y-4">
                    {productData.reviews.map((review) => (
                        <div key={review.id} className="border-b pb-4">
                            <p className="text-gray-700">{review.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
