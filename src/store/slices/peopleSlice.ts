import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types.ts";
import {instance} from "../../axios.ts";
import {AxiosResponse} from "axios";
import {getToken} from "../../utils.ts";

export const searchPeople = createAsyncThunk<IUser[], string>(
    "people/searchPeople",
    async (q: string, {rejectWithValue}): Promise<any> => {
        try {
            const response: AxiosResponse<IUser[]> = await instance.get(`/user/${q}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            })
            return response.data
        } catch (err) {
            throw rejectWithValue(err)
        }
    }
)

type peopleState = {
    loading: boolean,
    error: string | null,
    people: IUser[]
}

const initialState: peopleState = {
    error: null,
    loading: false,
    people: []
}

const isError = (action: any) => {
    return action.type.endsWith('rejected')
}

const peopleSlice = createSlice({
    name: "people",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(searchPeople.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(searchPeople.fulfilled, (state, action: PayloadAction<IUser[]>): void => {
                state.loading = false
                state.people = action.payload
            })
            .addMatcher(isError, (state, action: any): void => {
                state.error = action.payload.response.data.message
                state.loading = false
            })
    }
})

export default peopleSlice.reducer