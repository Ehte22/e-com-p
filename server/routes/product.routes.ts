import express, { Router } from "express";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller";


const router: Router = Router();


router.post("/", addProduct)
    .get("/getproduct/", getProducts)
    .get("/getid/:id", getProductById)
    .put("/update-product/:id", updateProduct)
    .delete("/delete-product/:id", deleteProduct);

export default router;
