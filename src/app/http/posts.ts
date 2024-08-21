import FakerApi from '@/lib/fakerApi'
import type { Post, Response, User } from './types'

const api = new FakerApi()

async function getAll() {
    const response = (await api.get('/posts', {})) as Response<Post[]>

    return response
}

async function getAllByUser() {
    const responseUser = (await api.get('/me', {})) as Response<User>
    const responsePosts = await getAll()
    const user = responseUser.data

    return {
        success: true,
        data: responsePosts.data
            ? responsePosts?.data.filter(post => post.user_id === user?.id)
            : [],
    } as Response<Post[]>
}

async function findOne(postId: number) {
    const response = (await api.get('/posts/view', {
        post_id: postId,
    })) as Response<Post>

    return response
}

async function create(body: Pick<Post, 'title' | 'content'>) {
    const response = (await api.post('/posts/create', body)) as Response

    return response
}

async function update(body: {
    post_id: number
    post: Pick<Post, 'title' | 'content'>
}) {
    const response = (await api.post('/posts/update', body)) as Response

    return response
}

async function remove(postId: number) {
    const response = (await api.delete(`/posts/remove`, {
        post_id: postId,
    })) as Response

    return response
}

export { create, findOne, getAll, getAllByUser, remove, update }
