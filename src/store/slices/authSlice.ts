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
    async (user: IUser, {rejectWithValue}): Promise<any> => {
        try {
            const response = await instance.post("/login", user)
            return response.data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const registerUser = createAsyncThunk<string, IUser>(
    'auth/registerUser',
    async (user: IUser, {rejectWithValue}): Promise<any> => {
        try {
            const response = await instance.post("/register", user)
            return response.data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

type authState = {
    token: string,
    loading: boolean,
    error: string | null,
    isAuth: boolean
}

const isError = (action: any) => {
    return action.type.endsWith('rejected')
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
            .addMatcher(isError, (state, action: any): void => {
                console.log(action.payload)
                state.error = action.payload.response.data.message
                state.loading = false
                state.isAuth = false
            })
    }
})

export default authSlice.reducer
export const logout = authSlice.actions.logout