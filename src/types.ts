export interface IUser {
    _id?: string,
    name: string,
    email: string,
    image: string,
    isAdmin: false,
    createdAt: string,
    updatedAt: string,
}

export interface IAuth {
    name?: string,
    email: string,
    password: string
}

export interface ILeftBarNavs {
    title: string,
    path: string
}

export interface IMessage {
    _id?: string,
    sender: string,
    content: string,
    roomId: string,
    readBy: string,
    createdAt: string,
    updatedAt: string
}

export interface IRoom {
    _id?: string,
    createdAt: string,
    updatedAt: string
}