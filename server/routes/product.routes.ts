<<<<<<< HEAD
import express from "express"
import * as productController from "../controllers/product.controller"

const PRODUCT_ROUTER = express.Router()

PRODUCT_ROUTER
    .get("/get-products", productController.getProducts)
    .get("/product/:id", productController.getProductById)
    .post("/add-product", productController.addProduct)
    .put("/update-product/:id", productController.updateProduct)
    .delete("/delete-product/:id", productController.deleteProduct)

export default PRODUCT_ROUTER
=======
import express, { Router } from "express";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller";


const router: Router = Router();


router.post("/", addProduct)
    .get("/getproduct/", getProducts)
    .get("/getid/:id", getProductById)
    .put("/update-product/:id", updateProduct)
    .delete("/delete-product/:id", deleteProduct);

export default router;
>>>>>>> b813c898b568045ca06a335e65933e0b28bc1ffc
