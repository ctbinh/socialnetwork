import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import uiReducer from "./ui";
import articleReducer from "./article";
import homeReducer from "./home";
import profileReducer from "./profile";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  article: articleReducer,
  home: homeReducer,
  profile: profileReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
