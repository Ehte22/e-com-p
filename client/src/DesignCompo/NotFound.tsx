import React from 'react';

const NotFound: React.FC = () => {
    return (
        <div className='pt-10'>
            <div className="flex justify-center items-center h-screen bg-slate-400">
                <div className="text-center text-white px-6 py-8 bg-opacity-80 bg-black rounded-lg shadow-lg max-w-lg">
                    <h1 className="text-7xl font-extrabold mb-4 animate-bounce">404</h1>
                    <p className="text-3xl font-semibold mb-6">Oops! Page not found</p>
                    <p className="text-lg mb-6">
                        The page you are looking for might have been moved, deleted, or never existed. But don't worry, you can return to the homepage and continue your journey!
                    </p>
                    <a
                        href="/"
                        className="inline-block bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-teal-600 transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        Go Back Home
                    </a>
                    <div className="mt-8">
                        <p className="text-md text-gray-300">
                            If you believe this is an error, please contact our support team.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
