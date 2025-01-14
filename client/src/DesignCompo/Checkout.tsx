import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { customValidator } from "../services/validator";
import DynamicForm, { FieldConfig } from "../components/DynamicForm";

const fields: FieldConfig[] = [
    {
        name: "name",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your full name",
        className: "w-full p-3 border rounded-md",
        errorClass: "border border-red-500 focus:ring-red-500 focus:border-red-500",
        rules: { required: true }
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        className: "w-full p-3 border rounded-md",
        errorClass: "border border-red-500 focus:ring-red-500 focus:border-red-500",
        rules: { required: true }
    },
    {
        name: "address",
        label: "Address",
        type: "text",
        placeholder: "Enter your address",
        className: "w-full p-3 border rounded-md",
        errorClass: "border border-red-500 focus:ring-red-500 focus:border-red-500",
        rules: { required: true }
    },
    {
        name: "city",
        label: "City",
        type: "text",
        placeholder: "Enter your city",
        className: "w-full p-3 border rounded-md",
        errorClass: "border border-red-500 focus:ring-red-500 focus:border-red-500",
        rules: { required: true }
    },
    {
        name: "zip",
        label: "ZIP Code",
        type: "text",
        placeholder: "Enter ZIP Code",
        className: "w-full p-3 border rounded-md",
        errorClass: "border border-red-500 focus:ring-red-500 focus:border-red-500",
        rules: { required: true }
    },

    // Payment Information
    {
        name: "cardNumber",
        label: "Card Number",
        type: "text",
        placeholder: "Enter card number",
        className: "w-full p-3 border rounded-md",
        errorClass: "border border-red-500 focus:ring-red-500 focus:border-red-500",
        rules: { required: true }
    },
    {
        name: "expiryDate",
        label: "Expiry Date (MM/YY)",
        type: "text",
        placeholder: "MM/YY",
        className: "w-full p-3 border rounded-md",
        errorClass: "border border-red-500 focus:ring-red-500 focus:border-red-500",
        rules: { required: true }
    },
    {
        name: "cvv",
        label: "CVV",
        type: "text",
        placeholder: "Enter CVV",
        className: "w-full p-3 border rounded-md",
        errorClass: "border border-red-500 focus:ring-red-500 focus:border-red-500",
        rules: { required: true }
    }
];

const defaultValues = {
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
};

const Checkout: React.FC = () => {
    const history = useNavigate();

    const schema = customValidator(fields);

    type FormValues = z.infer<typeof schema>;

    const onSubmit = (values: FormValues) => {
        console.log(values)
        alert('Checkout successful!');
        history('/confirmation');
    };

    const { renderSingleInput, handleSubmit } = DynamicForm({
        schema,
        fields,
        onSubmit,
        defaultValues
    });

    return (
        <div className="pt-28">
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-bold mb-6">Checkout</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold">Shipping Information</h3>
                        {renderSingleInput('name')}
                        {renderSingleInput('email')}
                        {renderSingleInput('address')}
                        {renderSingleInput('city')}
                        {renderSingleInput('zip')}
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold">Payment Information</h3>
                        {renderSingleInput('cardNumber')}
                        <div className="flex space-x-4">
                            {renderSingleInput('expiryDate')}
                            {renderSingleInput('cvv')}
                        </div>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold">Order Summary</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between font-semibold text-lg mt-4">
                                <span>Total</span>
                                <span>$</span>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-md font-semibold mt-6"
                    >
                        Complete Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
