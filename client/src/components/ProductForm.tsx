import { useState } from "react";
import { z } from "zod";
import { customValidator, ValidationRules } from "../services/validator";
import DynamicForm, { FieldConfig } from "../components/DynamicForm";
import {
    useAddProductMutation,
    useDeleteProductMutation,
    useGetProductsQuery,
    useUpdateProductMutation,
} from "../redux/api/productApi";

const fields: FieldConfig[] = [
    {
        name: "image",
        label: "Product Image",
        type: "file",
        placeholder: "Upload an image",
        className: "border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
        rules: { required: true, file: true },
    },
    {
        name: "name",
        label: "Product Name",
        type: "text",
        placeholder: "Enter product name",
        className: "border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
        rules: { required: true, min: 2, max: 100 },
    },
    {
        name: "price",
        label: "Price",
        type: "number",
        placeholder: "Enter product price",
        className: "border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
        rules: { required: true, min: 0 },
    },
    {
        name: "desc",
        label: "Description",
        type: "text",
        placeholder: "Enter product description",
        className: "border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
        rules: { required: true, max: 500 },
    },
];

const defaultValues = {
    image: null,
    name: "",
    price: "",
    desc: "",
};

export interface ExtractedRule {
    name: string;
    rules: ValidationRules | ExtractedRule[];
}

interface Product {
    id: string;
    name: string;
    desc: string;
    price: number;
    image: string;
}

const ProductForm = () => {
    const { data: products } = useGetProductsQuery();
    const [addProduct] = useAddProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const schema = customValidator(fields);
    type FormValues = z.infer<typeof schema>;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (values: FormValues) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("desc", values.desc);
        formData.append("price", values.price.toString());

        if (values.image) {
            formData.append("image", values.image[0]);
        }

        try {
            await addProduct(formData);
        } catch (error) {
            console.error("Error adding product", error);
        }
    };

    const handleDelete = async (productId: string) => {
        try {
            await deleteProduct(productId);
        } catch (error) {
            console.error("Error deleting product", error);
        }
    };

    const handleUpdate = async (productId: string, updatedProduct: FormValues) => {
        const formData = new FormData();
        formData.append("name", updatedProduct.name);
        formData.append("desc", updatedProduct.desc);
        formData.append("price", updatedProduct.price.toString());

        if (updatedProduct.image) {
            formData.append("image", updatedProduct.image[0]);
        }

        try {
            console.log(productId, "IDDDD((((");

            await updateProduct({ productId, formData });
        } catch (error) {
            console.error("Error updating product", error);
        }
    };

    const { renderSingleInput, handleSubmit } = DynamicForm({
        schema,
        fields,
        onSubmit,
        defaultValues,
    });

    return (
        <div className="container mt-5 p-6">
            <div className="max-w-lg mx-auto bg-white rounded-lg shadow-xl p-6">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Add New Product</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="col-span-1">
                            {renderSingleInput("name")}
                        </div>
                        <div className="col-span-1">
                            {renderSingleInput("price")}
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            {renderSingleInput("desc")}
                        </div>
                        <div className="col-span-1">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {previewImage && (
                                <div className="mt-4">
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        style={{ width: "100px", height: "70px", marginRight: "10px", borderRadius: "8px" }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="text-right mt-6">
                        <button
                            type="submit"
                            className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-300"
                        >
                            Add Product
                        </button>
                    </div>
                </form>

                <h2 className="text-2xl font-semibold mt-8">Existing Products</h2>
                <div className="mt-4">
                    {products?.map((product: Product) => (
                        <div key={product.id} className="flex justify-between items-center mb-4">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{product.name}</h3>
                                    <p>{product.desc}</p>
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleUpdate(product.id, { ...product, image: null })}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductForm;
