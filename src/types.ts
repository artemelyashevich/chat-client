export interface IUser {
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