import { Action, PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAuth } from "../../types"
import { instance } from "../../axios"

const apiCall = async (path: string, user: IAuth): Promise<string> => {
    const response = await instance.post(path, user)
    return response.data
}

export const registerUser = createAsyncThunk<string, IAuth>(
    'user/registerUser',
    async (user) => {
        return apiCall('/register', user)
    }
)

export const loginUser = createAsyncThunk<string, IAuth>(
    'user/loginUser',
    async (user) => {
        return apiCall('/login', user)
    }
)

const isError = (action: Action) => {
    return action.type.endsWith('rejected')
}

type userState = {
    token: string;
    loading: boolean;
    error: string | null;
    isAuth: boolean
}

const initialState: userState = {
    token:"",
    loading: false,
    isAuth: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout(state) {
            state.isAuth = false
            console.log(localStorage.getItem("@@remember-user"));

            localStorage.removeItem("@@remember-user")
        },
        setIsAuth(state) {
            state.isAuth = true
        }
    },
    extraReducers: (builder) => {
        builder
            // register user
            .addCase(registerUser.pending, state => {
                state.isAuth = false
                state.error = null
                state.loading = true
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.token = action.payload
                state.loading = false
                state.isAuth = true
            })
            // login users
            .addCase(loginUser.pending, state => {
                state.isAuth = false
                state.error = null
                state.loading = true
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.token = action.payload
                state.loading = false
                state.isAuth = true
            })
            // errors
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload
                state.loading = false
            })
    }
})

export const { logout, setIsAuth } = userSlice.actions
export default userSlice.reducer