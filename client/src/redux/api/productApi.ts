import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetProductsResponse, GetProductByIdResponse, } from '../../types/productTypes';

type UpdateProductParams = {
    id: string;
    productData: FormData;
};
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/product',
        credentials: 'include',
    }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<GetProductsResponse, void>({
            query: () => '/get-products',
            providesTags: ['Product'],
        }),

        getProductById: builder.query<GetProductByIdResponse, string>({
            query: (id) => `/product/${id}`,
            providesTags: (result, error, id) => result ? [{ type: 'Product', id }] : [],
        }),

        addProduct: builder.mutation<void, FormData>({
            query: (productData) => ({
                url: '/add-product',
                method: 'POST',
                body: productData,
            }),
            invalidatesTags: ['Product'],
        }),

        updateProduct: builder.mutation<void, UpdateProductParams>({
            query: ({ id, productData }) => ({
                url: `/update-product/${id}`,
                method: 'PUT',
                body: productData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
        }),



        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `/delete-product/${id}`,
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



