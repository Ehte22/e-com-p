import { configureStore } from "@reduxjs/toolkit";
import { cartApi } from "./api/cartApi";
import authSlice from "./slices/authSlice";
import { orderApi } from "./api/orderApi";
import { authApi } from "./api/authApi";
import { productApi } from "./api/productApi";


const reduxStore = configureStore({
    reducer: {
        [cartApi.reducerPath]: cartApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        auth: authSlice
        // [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cartApi.middleware, orderApi.middleware,

            authApi.middleware,
            productApi.middleware
        ),
})

export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch

export default reduxStore