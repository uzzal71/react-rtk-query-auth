import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginApi } from "../services/loginApi";
import { signupApi } from "../services/signupApi";

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [signupApi.reducerPath]: signupApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loginApi.middleware, signupApi.middleware)
});

setupListeners(store.dispatch);
