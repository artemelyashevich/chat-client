import { configureStore } from "@reduxjs/toolkit";
import { rememberEnhancer, rememberReducer } from "redux-remember";
import authSlice from "./slices/authSlice.ts";
import userSlice from "./slices/userSlice.ts";

const rememberedKeys: string[] = ['auth']

const store = configureStore({
    reducer: rememberReducer({
        auth: authSlice,
        user: userSlice
    }),
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(
        rememberEnhancer(
            window.localStorage,
            rememberedKeys
        )
    ),
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch