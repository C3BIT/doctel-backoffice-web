import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from 'redux-logger';
import authSlice from "./auth/authSlice";
import  prescriptionsSlice  from "./prescription/prescriptionSlice";
const persistConfig = {
  key: "authentication",
  storage,
};
const persistedReducer = persistReducer(persistConfig,authSlice);
const combinedReducer = {
  user: persistedReducer,
  prescriptions:prescriptionsSlice
 
};
const middlewares = [];
if (import.meta.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: true,
});
export const persistor = persistStore(store);