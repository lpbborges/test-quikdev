import type { Comment } from './comment'

export interface Post {
    id: number
    title: string
    content: string
    user_id: number
    comments: Comment[]
}
