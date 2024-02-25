import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import authApi from "../services/auth";
import privateAuthApi from "../services/privateAuth";
import cartApi from "../services/cart";
import categoryApi from "../services/category";
import itemApi from "../services/item";
import reviewApi from "../services/review";
import seatApi from "../services/seat";
import paymentApi from "../services/payment";
import orderApi from "../services/order";
import orderItemApi from "../services/orderitem";

import { injectStore } from "../api/axios";

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    [privateAuthApi.reducerPath]: privateAuthApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [seatApi.reducerPath]: seatApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [orderItemApi.reducerPath]: orderItemApi.reducer,
});

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(
            authApi.middleware,
            privateAuthApi.middleware,
            cartApi.middleware,
            categoryApi.middleware,
            itemApi.middleware,
            reviewApi.middleware,
            seatApi.middleware,
            paymentApi.middleware,
            orderApi.middleware,
            orderItemApi.middleware
        ),
});

injectStore(store);

export const persistor = persistStore(store);
