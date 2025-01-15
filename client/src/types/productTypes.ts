
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
}

export interface GetProductsResponse {
    products: Product[];
}

export interface GetProductByIdResponse {
    product: Product;
}

export interface ProductData {
    name: string;
    description: string;
    price: number;

}
