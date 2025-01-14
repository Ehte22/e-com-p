import express from "express";
import { deleteOrder, getAllOrders, getOrderById, palceOrder, updateOrder } from "../controllers/order.controller";
import { authenticate } from "../services/passport";


const orderrouter = express.Router();

orderrouter.post("/place-order", authenticate as any, palceOrder);
orderrouter.get("/get-all-order", getAllOrders);
orderrouter.get("/:id", getOrderById);
orderrouter.put("/:id", updateOrder);
orderrouter.delete("/:id", deleteOrder);

export default orderrouter;
