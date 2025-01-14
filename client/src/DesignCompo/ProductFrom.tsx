import { z } from "zod";
import { customValidator, ValidationRules } from "../services/validator";
import DynamicForm, { FieldConfig } from "../components/DynamicForm";

const fields: FieldConfig[] = [
    {
        name: "image",
        label: "Product Image",
        type: "file",
        placeholder: "Upload an image",
        className: "border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
        errorClass: "border border-red-500 focus:ring-red-500 focus:border-red-500 rounded px-4 py-2",
        rules: { required: true }
    },
    {
        name: "name",
        label: "Product Name",
        type: "text",
        placeholder: "Enter product name",
        className: "border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
        errorClass: "border border-red-500 focus:ring-red-500 focus:border-red-500 rounded px-4 py-2",
        rules: { required: true, min: 2, max: 100 }
    },
    {
        name: "price",
        label: "Price",
        type: "number",
        placeholder: "Enter product price",
        className: "border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
        errorClass: "border border-red-500 focus:ring-red-500 focus:border-red-500 rounded px-4 py-2",
        rules: { required: true, min: 0 }
    },
    {
        name: "desc",
        label: "Description",
        type: "text",
        placeholder: "Enter product description",
        className: "border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
        errorClass: "border border-red-500 focus:ring-red-500 focus:border-red-500 rounded px-4 py-2",
        rules: { required: true, max: 500 }
    },
];

const defaultValues = {
    image: null,
    name: "",
    price: "",
    desc: "",
}

export interface ExtractedRule {
    name: string;
    rules: ValidationRules | ExtractedRule[];
}

const ProductForm = () => {
    const schema = customValidator(fields)

    type FormValues = z.infer<typeof schema>

    const onSubmit = (values: FormValues) => {
        console.log(values);
        // You can handle form submission here (e.g., API call)
    };

    const { renderSingleInput, handleSubmit, previewImages } = DynamicForm({ schema, fields, onSubmit, defaultValues })

    return (
        <>
            <div className="container mt-5 p-6">
                <div className="max-w-lg mx-auto bg-white rounded-lg shadow-xl p-6">
                    <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Add New Product</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="col-span-1">
                                {renderSingleInput('name')}
                            </div>
                            <div className="col-span-1">
                                {renderSingleInput('price')}
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                {renderSingleInput('desc')}
                            </div>
                            <div className="col-span-1">
                                {renderSingleInput('image')}
                                {previewImages && (
                                    <div className="mt-4">
                                        {Array.isArray(previewImages) ? (
                                            previewImages.map((src, index) => (
                                                <img
                                                    key={index}
                                                    src={src}
                                                    alt="Preview"
                                                    style={{ width: "100px", height: "70px", marginRight: "10px", borderRadius: "8px" }}
                                                />
                                            ))
                                        ) : (
                                            <img
                                                src={previewImages as string}
                                                alt="Preview"
                                                style={{ width: "100px", height: "70px", marginRight: "10px", borderRadius: "8px" }}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="text-right mt-6">
                            <button type="submit" className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-300">
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProductForm;
