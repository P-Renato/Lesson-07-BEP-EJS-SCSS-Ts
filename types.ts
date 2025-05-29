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
};