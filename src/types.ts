export interface IUser {
    _id?: string,
    name: string,
    email: string,
    image: string,
    createdAt: string,
    updatedAt: string,
}

export interface IAuth {
    name?: string,
    email: string,
    password: string
}

export interface ILeftBarNavs {
    element: JSX.Element,
    path: string
}

export interface IMessage {
    _id?: string,
    sender: string,
    content: string,
    roomId: string,
    readBy?: string,
    createdAt?: string,
    updatedAt?: string
}

export interface IRoom {
    _id?: string,
    title?: string,
    usersId?: [{ userId: string }],
    creatorId?: string,
    createdAt?: string,
    updatedAt?: string
}