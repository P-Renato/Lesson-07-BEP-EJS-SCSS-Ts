import fs from 'fs'
import type { Post } from './types.ts'



export function read(): Post[] {
    return JSON.parse(fs.readFileSync('data.json', 'utf-8'))
}

export function write(data: Post[]) {
    const content = JSON.stringify(data)
    fs.writeFileSync('data.json', content, 'utf-8')
}

