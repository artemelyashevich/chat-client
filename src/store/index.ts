import { configureStore } from "@reduxjs/toolkit";
import { rememberEnhancer, rememberReducer } from "redux-remember";
import authSlice from "./slices/authSlice.ts";

const rememberedKeys: string[] = ['auth']

const store = configureStore({
    reducer: rememberReducer({
        auth: authSlice
    }),
    enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(
        rememberEnhancer(
            window.localStorage,
            rememberedKeys
        )
    )
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch