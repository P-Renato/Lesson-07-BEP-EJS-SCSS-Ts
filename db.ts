import fs from 'fs'
import type { Post, User } from './types.ts'



export function readPost(): Post[] {
    return JSON.parse(fs.readFileSync('post-data.json', 'utf-8'))
}

export function writePost(data: Post[]) {
    const content = JSON.stringify(data, null, 2)
    fs.writeFileSync('post-data.json', content, 'utf-8')
}

export function readUser(): User[] {
    return JSON.parse(fs.readFileSync('user-data.json', 'utf-8'))
}

export function writeUser(users: User[]) {
    const content = JSON.stringify(users, null, 2);
    fs.writeFileSync('user-data.json', content, 'utf-8')
}