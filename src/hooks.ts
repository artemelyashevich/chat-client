import {useDispatch, useSelector, TypedUseSelectorHook} from "react-redux"
import type {RootState, AppDispatch} from './store'
import React from "react";
import {SocketApi} from "./api/socket-api.ts";

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useConnectSocket = () => {

    const connectSocket = (): void => {
        SocketApi.createConnection()
    }

    React.useEffect(() => {
        connectSocket()
    }, [])
}