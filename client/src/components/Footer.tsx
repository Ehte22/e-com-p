import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">ShopEasy</h2>
                        <p>
                            Your one-stop shop for the best deals and the latest trends. Experience hassle-free shopping today!
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/about" className="hover:text-white">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="hover:text-white">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="/faq" className="hover:text-white">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="/terms" className="hover:text-white">
                                    Terms & Conditions
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
                        <p>Subscribe to our newsletter for the latest updates and offers.</p>
                        <form className="mt-4">
                            <div className="flex items-center">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 rounded-l-md focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
                    <p>&copy; 2025 ShopEasy. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
