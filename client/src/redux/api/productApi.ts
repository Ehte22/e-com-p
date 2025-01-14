import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetProductsResponse, GetProductByIdResponse, } from '../../types/productTypes';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/products',
        credentials: 'include',
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<GetProductsResponse, void>({
            query: () => '/products',
            providesTags: ['Product'],
        }),

        getProductById: builder.query<GetProductByIdResponse, string>({
            query: (id) => `/products-id/${id}`,
            providesTags: (result, error, id) => result ? [{ type: 'Product', id }] : [],
        }),

        addProduct: builder.mutation<void, FormData>({
            query: (productData) => ({
                url: '/add-products',
                method: 'POST',
                body: productData,
            }),
            invalidatesTags: ['Product'],
        }),

        updateProduct: builder.mutation<void, { id: string; productData: FormData }>({
            query: ({ id, productData }) => ({
                url: `/update-products/${id}`,
                method: 'PUT',
                body: productData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
        }),


        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `/delete-products/${id}`,
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
