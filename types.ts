export type Post = {
        id: number,
        author: string,
        title: string,
        content: string   
}

export type FormReqBody = {
    title: string;
    author: string;
    content: string;
}

export type User = {
    id: string,
    name: string,
    email: string,
    password: string
}

export type UserReqBody = {
    name: string,
    email: string,
    password: string
}