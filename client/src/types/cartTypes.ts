

export interface ProductItem {
    product: string;
    qty: number;
}

export interface ProductRequest {
    user: string;
    products: ProductItem[];
}

export interface Product {
    _id: string;
    address: string;
    user: string;
    products: ProductItem[];
}

export interface ProductDetail {
    _id: string;
    name: string;
    desc: string;
    price: number;
    pId: number;
    stock: number;
    mrp: number;
    hero: string;
    active: boolean;
}

export interface Cartinfo {
    _id: string;
    isDeleted?: boolean;
    qty: number;
    productId: Product;
    userId: string;
    pId: string;
}

export interface IProduct {
    _id: string;
    name: string;
    desc: string;
    price: number;
    stock: number;
    mrp: number;
    hero: string;
    active: boolean;
    pId: string;
}
