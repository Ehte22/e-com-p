import mongoose, { Schema, Document, Model } from "mongoose";

interface productId {
    product: mongoose.Types.ObjectId;
    qty: number;
}

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    productId: productId[];

    status: "placed" | "cancel" | "delivered";
    createdAt?: Date;
    updatedAt?: Date;
}

const orderSchema: Schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: true,
        },
        productId: [{
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product",
                required: true
            },
            qty: {
                type: Number
            }
        }
        ],
        totalAmount: {
            type: Number,
            required: true
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ["Cash on Delivery"],
            default: "Cash on Delivery",
        },
        status: {
            type: String,
            required: true,
            enum: ["Pending", "Shipped", "Delivered", "Cancelled", "Returned"],
            default: "Pending",
        },
        returnStatus: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected', 'Completed'],
            default: null,
        },
        returnReason: { type: String, default: null }
    },
    { timestamps: true }
);

const Order: Model<IOrder> = mongoose.model<IOrder>("order", orderSchema);

export default Order;
