import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
         baseUrl: `${import.meta.env.VITE_BACKEND_URL}/order`, 
           prepareHeaders:()=>{

           } 
        }),
    tagTypes: ["cart"],
    endpoints: (builder) => {
        return {
            getAllOrders: builder.query({
                query: () => {
                    return {
                        url: `/get-orders`,
                        method: "GET"
                    }
                },
                transformResponse:(data:any) =>{
                   return data.result
                },
                providesTags: ["cart"]
            }),
            createOrder: builder.mutation({
                query: orderData => {
                    return {
                        url: "/create-order",
                        method: "POST",
                        body: orderData
                    }
                },
                invalidatesTags: ["cart"]
            }),
            cancelOrder: builder.mutation({
                query: orderData => {
                    return {
                        url: "/cancel-order",
                        method: "POST",
                        body: orderData
                    }
                },
                invalidatesTags: ["cart"]
            }),
            
        
        }
    }
})

export const {
    useCancelOrderMutation,
    useCreateOrderMutation,
    useGetAllOrdersQuery

} = orderApi
