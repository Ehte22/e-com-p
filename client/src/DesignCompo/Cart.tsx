import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

const Cart: React.FC = () => {
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState<CartItem[]>([
        { id: 1, name: 'Product 1', price: 10, quantity: 1 },
        { id: 2, name: 'Product 2', price: 20, quantity: 1 },
    ]);

    const handleIncrease = (id: number) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const handleDecrease = (id: number) => {
        setCartItems(cartItems.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    const handleRemove = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className='pt-32'>
            <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg ">
                <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
                <div>
                    {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center mb-4 p-4 bg-gray-100 rounded-lg">
                            <div className="flex items-center space-x-4">
                                <span className="text-lg font-semibold">{item.name}</span>
                                <span className="text-gray-500">${item.price}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleDecrease(item.id)}
                                    className="bg-gray-300 p-2 rounded-full text-lg"
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() => handleIncrease(item.id)}
                                    className="bg-gray-300 p-2 rounded-full text-lg"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="bg-red-500 text-white p-2 rounded-full"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-4 font-semibold text-lg">
                    <span>Total:</span>
                    <span>${getTotal()}</span>
                </div>
                <div className="mt-6 flex justify-between">
                    <button onClick={() => navigate("/checkout")} className="bg-green-500 text-white px-4 py-2 rounded-full">Proceed to Checkout</button>
                    <button onClick={() => navigate("/")} className="bg-gray-300 text-black px-4 py-2 rounded-full">Continue Shopping</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
