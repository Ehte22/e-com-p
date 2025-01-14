import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({
         baseUrl: `${import.meta.env.VITE_BACKEND_URL}/cart`, 
           prepareHeaders:()=>{

           } 
        }),
    tagTypes: ["cart"],
    endpoints: (builder) => {
        return {
            getAllCarts: builder.query({
                query: () => {
                    return {
                        url: "/get-carts",
                        method: "GET"
                    }
                },
                transformResponse:(data:any) =>{
                   return data.result
                },
                providesTags: ["cart"]
            }),
            addCart: builder.mutation({
                query: cartData => {
                    return {
                        url: "/add-cart",
                        method: "POST",
                        body: cartData
                    }
                },
                invalidatesTags: ["cart"]
            }),
            deleteCart: builder.mutation({
                query: id => {
                    return {
                        url: `/delete-cart/${id}`,
                        method: "DELETE",
                        // body: cartData
                    }
                },
                invalidatesTags: ["cart"]
            }),
        
        }
    }
})

export const {
      useAddCartMutation,
      useGetAllCartsQuery,
      useDeleteCartMutation

} = cartApi
