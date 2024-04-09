import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {IUser} from "../../types.ts"
import {AxiosResponse} from "axios"
import {instance} from "../../axios.ts"
import {getToken} from "../../utils.ts";

export const fetchMe = createAsyncThunk<IUser>(
    'auth/fetchMe',
    async (_, {rejectWithValue}): Promise<any> => {
        try {
            const response: AxiosResponse<IUser> = await instance.get("/user", {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            return response.data
        } catch (err) {
            return rejectWithValue(err)
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
            .addMatcher(isError, (state, action: any): void => {
                state.error = action.payload.response.data.message
                state.loading = false
            })
    }
})

export default userSlice.reducer