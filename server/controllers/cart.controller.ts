import { Request, Response } from "express";
import Cart from "../models/Cart";

export const addToCart = async (req: Request, res: Response) => {
    try {
        const { userId, productId, qty } = req.body;

        let cartItem = await Cart.findOne({ userId, productId });
        if (cartItem) {
            cartItem.qty += qty || 1;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({ userId, productId, qty });
        }
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: "Error adding item to cart", error });
    }
};

export const getCartItems = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const cartItems = await Cart.find({ userId }).populate("productId");
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart items", error });
    }
};

export const updateCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { qty } = req.body;

        const cartItem = await Cart.findByIdAndUpdate(
            id,
            { qty },
            { new: true }
        );

        if (!cartItem) {
            res.status(404).json({ message: "Cart item not found" });
            return;
        }

        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: "Error updating cart item", error });
    }
};

export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const cartItem = await Cart.findByIdAndDelete(id);

        if (!cartItem) {
            res.status(404).json({ message: "Cart item not found" });
            return;
        }

        res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
        res.status(500).json({ message: "Error removing item from cart", error });
    }
};

export const clearCart = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        await Cart.deleteMany({ userId });

        res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
        res.status(500).json({ message: "Error clearing cart", error });
    }
};
