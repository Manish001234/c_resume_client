import { configureStore, combineReducers } from "@reduxjs/toolkit";
import themeReducer from "./Reducers/themeReducer";
import userReducer from "./Reducers/userReducer";
import storage from "redux-persist/lib/storage"; // Default storage for web
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";

// Configuration for redux-persist
const persistConfig = {
    key: 'root',
    storage, // Using default storage for web
};

// Combine the reducers
const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
});

// Apply persistReducer to rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer and middleware
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;
