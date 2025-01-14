import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetProductsResponse, GetProductByIdResponse, } from '../../types/productTypes';

<<<<<<< HEAD
type UpdateProductParams = {
    id: string;
    productData: FormData;
};
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/product',
=======
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/products',
>>>>>>> b813c898b568045ca06a335e65933e0b28bc1ffc
        credentials: 'include',
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<GetProductsResponse, void>({
<<<<<<< HEAD
            query: () => '/get-products',
=======
            query: () => '/products',
>>>>>>> b813c898b568045ca06a335e65933e0b28bc1ffc
            providesTags: ['Product'],
        }),

        getProductById: builder.query<GetProductByIdResponse, string>({
<<<<<<< HEAD
            query: (id) => `/product/${id}`,
=======
            query: (id) => `/products-id/${id}`,
>>>>>>> b813c898b568045ca06a335e65933e0b28bc1ffc
            providesTags: (result, error, id) => result ? [{ type: 'Product', id }] : [],
        }),

        addProduct: builder.mutation<void, FormData>({
            query: (productData) => ({
<<<<<<< HEAD
                url: '/add-product',
=======
                url: '/add-products',
>>>>>>> b813c898b568045ca06a335e65933e0b28bc1ffc
                method: 'POST',
                body: productData,
            }),
            invalidatesTags: ['Product'],
        }),

<<<<<<< HEAD
        updateProduct: builder.mutation<void, UpdateProductParams>({
            query: ({ id, productData }) => ({
                url: `/update-product/${id}`,
=======
        updateProduct: builder.mutation<void, { id: string; productData: FormData }>({
            query: ({ id, productData }) => ({
                url: `/update-products/${id}`,
>>>>>>> b813c898b568045ca06a335e65933e0b28bc1ffc
                method: 'PUT',
                body: productData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
        }),


<<<<<<< HEAD

        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `/delete-product/${id}`,
=======
        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `/delete-products/${id}`,
>>>>>>> b813c898b568045ca06a335e65933e0b28bc1ffc
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;
<<<<<<< HEAD



=======
>>>>>>> b813c898b568045ca06a335e65933e0b28bc1ffc
