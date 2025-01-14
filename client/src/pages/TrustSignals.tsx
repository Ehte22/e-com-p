// TrustSignals.tsx

import React from 'react';

const TrustSignals: React.FC = () => {
    return (
        <section className="bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Secure Payments</h3>
                        <p className="text-gray-600 mb-2">Our payment methods are fully secure, ensuring your data is protected.</p>
                        <div className="flex justify-center space-x-4">
                            <img src="https://via.placeholder.com/50x50?text=Visa" alt="Visa" className="h-12" />
                            <img src="https://via.placeholder.com/50x50?text=Mastercard" alt="Mastercard" className="h-12" />
                            <img src="https://via.placeholder.com/50x50?text=Paypal" alt="Paypal" className="h-12" />
                        </div>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Customer Reviews</h3>
                        <p className="text-gray-600 mb-2">Thousands of satisfied customers trust us for quality products and service.</p>
                        <div className="space-y-2">
                            <div className="flex items-center justify-center space-x-2">
                                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                                <p className="text-gray-600">"Amazing quality and fast delivery!"</p>
                            </div>
                            <div className="flex items-center justify-center space-x-2">
                                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                                <p className="text-gray-600">"I love the products, great customer service!"</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Money-Back Guarantee</h3>
                        <p className="text-gray-600 mb-2">If you're not completely satisfied with your purchase, we offer a 30-day money-back guarantee.</p>
                        <div className="text-green-500 font-semibold">No questions asked!</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustSignals;
