import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {instance} from "../../axios.ts";
import {IUser} from "../../types.ts";
import {AxiosResponse} from "axios";

export const fetchMe = createAsyncThunk<IUser, string>(
    'auth/fetchMe',
    async (token: string): Promise<IUser> => {
        const response: AxiosResponse<IUser> = await instance.get("/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
)

export const loginUser = createAsyncThunk<string, IUser>(
    'auth/loginUser',
    async (user: IUser): Promise<string> => {
        const response = await instance.post("/login", user)
        return response.data
    }
)

export const registerUser = createAsyncThunk<string, IUser>(
    'auth/registerUser',
    async (user: IUser): Promise<string> => {
        const response = await instance.post("/register", user)
        return response.data
    }
)

type authState = {
    token: string,
    loading: boolean,
    error: string | null,
    isAuth: boolean
}

const initialState: authState = {
    token: "",
    loading: false,
    error: null,
    isAuth: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state): void {
            state.isAuth = false
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>): void => {
                console.log(action.payload)
                state.loading = false
                state.token = action.payload
                state.isAuth = true
            })
            // TODO: implements types
            .addCase(loginUser.rejected, (state, action: any): void => {
                state.loading = false
                state.isAuth = false
                state.error = action.payload
            })
            .addCase(registerUser.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action): void => {
                console.log(action.payload)
                state.loading = false
                state.token = action.payload
                state.isAuth = true
            })
            .addCase(registerUser.rejected, (state, action: any): void => {
                state.loading = false
                state.isAuth = false
                state.error = action.payload
            })
    }
})

export default authSlice.reducer
export const logout = authSlice.actions.logout