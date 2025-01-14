import express from "express";
import { addToCart, clearCart, getCartItems, removeFromCart, updateCartItem } from "../controllers/cart.controller";


const cartrouter = express.Router();

cartrouter.post("/", addToCart);
cartrouter.get("/:userId", getCartItems);
cartrouter.delete("/clear/:userId", clearCart);
cartrouter.put("/:id", updateCartItem);
cartrouter.delete("/:id", removeFromCart);

export default cartrouter;
