import { createSlice } from "@reduxjs/toolkit";
import { IMessage } from "../../types.ts";

type messageState = {
    loading: boolean,
    error: null | string,
    message: IMessage
}

const initialState: messageState = {
    loading: false,
    error: null,
    message: {
        sender: "",
        content: "",
        roomId: "",
        readBy: "",
        createdAt: "",
        updatedAt: ""
    }
}

// @ts-ignore
const isError = (action: any) => {
    return action.type.endsWith('rejected')
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {}
})

export default messageSlice.reducer