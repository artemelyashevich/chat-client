import { configureStore } from "@reduxjs/toolkit";
import { rememberEnhancer, rememberReducer } from "redux-remember";
import authSlice from "./slices/authSlice.ts";
import userSlice from "./slices/userSlice.ts";
import messageSlice from "./slices/messageSlice.ts";
import roomSlice from "./slices/roomSlice.ts";
import peopleSlice from "./slices/peopleSlice.ts";

const rememberedKeys: string[] = ['auth', 'user']

const store = configureStore({
    reducer: rememberReducer({
        auth: authSlice,
        user: userSlice,
        message: messageSlice,
        room: roomSlice,
        people: peopleSlice
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