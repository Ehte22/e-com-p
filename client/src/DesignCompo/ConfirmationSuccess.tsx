import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmationSuccess: React.FC = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(5)
    const handleGoHome = () => {
        navigate('/')
    }
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime === 1) {
                    clearInterval(timer)
                    navigate('/')
                }
                return prevTime - 1
            })
        }, 1000)
        return () => clearInterval(timer);
    }, [navigate])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-6">
            <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="mb-6 text-green-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 4.293a1 1 0 00-1.414 0L8 11.586 4.707 8.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">Order Confirmed</h2>
                <p className="text-lg text-gray-600 mb-6">
                    Thank you for your purchase! Your order has been successfully placed. You will receive a confirmation email shortly.
                </p>
                <p className="text-lg text-gray-600 mb-6">Redirecting to home in {timeLeft} seconds...</p>
                <button
                    onClick={handleGoHome}
                    className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition-all duration-300">Go to Home</button>
            </div>
        </div>
    )
}

export default ConfirmationSuccess
