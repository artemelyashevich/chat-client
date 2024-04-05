import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {instance} from "../../axios.ts";

const createRoom = createAsyncThunk<string, string>(
    'room/fetchRoomId',
    async (title: string, {rejectWithValue}): Promise<string> => {
        try {
            const response = await instance.post('/room', title)
            return response.data
        } catch (err) {
            throw rejectWithValue(err)
        }
    }
)

const getRoomIdByTitle = createAsyncThunk<string, string>(
    'room/getRoomIdByTitle',
    async (title: string, {rejectWithValue}): Promise<string> => {
        try {
            const response = await instance.get(`/room/${title}`)
            return response.data
        } catch (err) {
            throw rejectWithValue(err)
        }
    }
)

type roomState = {
    loading: boolean,
    error: null | string,
    roomId: string
}

const initialState: roomState = {
    loading: false,
    error: null,
    roomId: ""
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
            .addCase(createRoom.pending, state => {
                state.error = null
                state.loading = true
            })
            .addCase(createRoom.fulfilled, (state, action: PayloadAction<string>): void => {
                state.roomId = action.payload
                state.loading = false
            })
            .addCase(getRoomIdByTitle.pending, state => {
                state.error = null
                state.loading = true
            })
            .addCase(getRoomIdByTitle.fulfilled, (state, action: PayloadAction<string>): void => {
                state.roomId = action.payload
                state.loading = false
            })
            .addMatcher(isError, (state, action: any): void => {
                state.error = action.payload.response.data.message
                state.loading = false
            })
    }
})

export default roomSlice.reducer