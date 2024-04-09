import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {instance} from "../../axios.ts";
import {AxiosResponse} from "axios";
import {IRoom} from "../../types.ts";
import {getToken} from "../../utils.ts";

export const createRoom = createAsyncThunk<string, IRoom>(
    'room/fetchRoomId',
    async (room: IRoom, {rejectWithValue}): Promise<string> => {
        try {
            // @ts-ignore
            const response: AxiosResponse<string> = await instance.post('/room', room, {
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

export const getRoomIdByTitle = createAsyncThunk<string, string>(
    'room/getRoomIdByTitle',
    async (title: string, {rejectWithValue}): Promise<string> => {
        try {
            const response: AxiosResponse<string> = await instance.get(`/room/${title}`)
            return response.data
        } catch (err) {
            throw rejectWithValue(err)
        }
    }
)

export const getRooms = createAsyncThunk<IRoom[]>(
    'room/getRooms',
    async (_, {rejectWithValue}): Promise<IRoom[]> => {
        try {
            const response = await instance.get('/room', {
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

type roomState = {
    loading: boolean,
    error: null | string,
    roomId: string,
    rooms: IRoom[]
}

const initialState: roomState = {
    loading: false,
    error: null,
    roomId: "",
    rooms: []
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
            .addCase(getRooms.pending, state => {
                state.error = null
                state.loading = true
            })
            .addCase(getRooms.fulfilled, (state, action: PayloadAction<IRoom[]>): void => {
                state.rooms = action.payload
                state.loading = false
            })
            .addMatcher(isError, (state, action: any): void => {
                state.error = action.payload.response.data.message
                state.loading = false
            })
    }
})

export default roomSlice.reducer