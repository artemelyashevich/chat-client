import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { rememberEnhancer, rememberReducer } from "redux-remember";

const rememberedKeys: string[] = ['user']

const store = configureStore({
    reducer: rememberReducer({
        user: userSlice
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