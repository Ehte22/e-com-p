import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/product.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: true,
    credentials: true
}));

// app.use("/api/v1/auth",auth);
app.use("/api/v1/product", router);
// app.use("/api/v1/cart");
// app.use("/api/v1/order");

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

