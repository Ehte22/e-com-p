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