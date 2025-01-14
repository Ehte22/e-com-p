import mongoose, { Model, Schema } from "mongoose"

<<<<<<< HEAD
export interface IProduct {
=======
export interface IProduct extends Document {
>>>>>>> b813c898b568045ca06a335e65933e0b28bc1ffc
    name: string
    price: string
    desc: string
    image: string
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
}, { timestamps: true })

export const Product: Model<IProduct> = mongoose.model<IProduct>("product", productSchema)