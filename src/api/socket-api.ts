import io, {Socket} from "socket.io-client"

export class SocketApi {
    static socket: null | Socket = null

    static createConnection = (): void => {
        SocketApi.socket = io("http://localhost:8080/")

        SocketApi.socket.on("connect", (): void => {
            console.log("Connected")
        })

        //@ts-ignore
        SocketApi.socket.on("disconnect", e => {
            console.log("Disconnected")
        })
    }

    public static sendMessage = (message: string): void => {
        // @ts-ignore
        SocketApi.socket.emit("send_message", {text: message})
    }
}