import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "../../types.ts"
import { AxiosResponse } from "axios"
import { instance } from "../../axios.ts"
import { getToken } from "../../utils.ts";

export const fetchMe = createAsyncThunk<IUser, string>(
    'user/fetchMe',
    async (token: string = getToken(), { rejectWithValue }): Promise<any> => {
        try {
            const response: AxiosResponse<IUser> = await instance.get("/user", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
        } catch (err) {
            return rejectWithValue(err)
        }
    }
)

export const updateMe = createAsyncThunk<IUser, IUser>(
    'user/updateMe',
    async (data: IUser, { rejectWithValue }): Promise<any> => {
        try {
            const response = await instance.patch("/users", data, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            return response.data
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

const isError = (action: any) => {
    return action.type.endsWith('rejected')
}

type userState = {
    loading: boolean,
    error: string | null,
    user: IUser
}

const initialState: userState = {
    loading: false,
    error: null,
    user: {
        name: "",
        email: "",
        image: "",
        updatedAt: "",
        createdAt: ""
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchMe.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchMe.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(updateMe.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(updateMe.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.loading = false
                state.user = action.payload
            })
            .addMatcher(isError, (state, action: any): void => {
                state.error = action.payload?.response?.data?.message || 'something went wrong...'
                state.loading = false
            })
    }
})

export default userSlice.reducer