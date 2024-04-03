import {IRoom} from "../../types.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {instance} from "../../axios.ts";

export const fetchRooms = createAsyncThunk<IRoom, string>(
    "room/fetchRooms",
    async (token: string, {rejectWithValue}): Promise<any> => {
        try {
            const response = await instance.get("/rooms", {
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

type roomState = {
    loading: boolean,
    error: null | string,
    room: IRoom
}

const initialState: roomState = {
    loading: false,
    error: null,
    room: {
        roomName: "",
        isGroupRoom: false,
        users: [],
        latestMessage: "",
        createdAt: "",
        updatedAt: ""
    }
}

const isError = (action: any) => {
    return action.type.endsWith('rejected')
}

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchRooms.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchRooms.fulfilled, (state, action): void => {
                state.loading = false
                state.room = action.payload
            })
            .addMatcher(isError, (state, action: any): void => {
                state.error = action.payload.response.data.message
                state.loading = false
            })
    }
})

export default roomSlice.reducer