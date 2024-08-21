import FakerApi from '@/lib/fakerApi'
import type { Comment, Response } from './types'

const api = new FakerApi()

async function getAllByPost(post_id: number) {
    const response = (await api.get('/comments', {
        post_id,
    })) as Response<Comment[]>

    return response
}

async function findOne(params: { post_id: number; comment_id: number }) {
    const response = (await api.get(
        '/comments/view',
        params
    )) as Response<Comment>

    return response
}

async function create(body: {
    post_id: number
    comment: Pick<Comment, 'content'>
}) {
    const response = (await api.post('/comments/create', body)) as Response

    return response
}

async function update(body: {
    post_id: number
    comment_id: number
    comment: Pick<Comment, 'content'>
}) {
    const response = (await api.put('/comments/update', body)) as Response

    return response
}

async function remove(params: { post_id: number; comment_id: number }) {
    const response = (await api.delete(`/comments/remove`, params)) as Response

    return response
}

export { create, findOne, getAllByPost, remove, update }
