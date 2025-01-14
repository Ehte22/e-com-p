import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/product.routes";

import authrouter from "./routes/auth.routes";
import orderrouter from "./routes/order.routes";
import cartrouter from "./routes/cart.routes";

import PRODUCT_ROUTER from "./routes/product.routes";


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: true,
    credentials: true
}));

<<<<<<< HEAD
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/order", orderrouter);
app.use("/api/v1/product", PRODUCT_ROUTER);
app.use("/api/v1/cart", cartrouter);

=======
// app.use("/api/v1/auth",auth);
app.use("/api/v1/product", router);
// app.use("/api/v1/cart");
// app.use("/api/v1/order");
>>>>>>> b813c898b568045ca06a335e65933e0b28bc1ffc

// 404 Handler
app.use("*", (req: Request, res: Response) => {
    res.status(404).json({ message: "Resource Not Found" });
});

// Error Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: "Something went wrong", error: err.message });
});

// Initialize MongoDB
mongoose.connect(process.env.MONGO_URL || "").catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
});

// Start the Server
const PORT = process.env.PORT || 5000;
mongoose.connection.once("open", async () => {
    console.log("MongoDb Connected");

    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
});

