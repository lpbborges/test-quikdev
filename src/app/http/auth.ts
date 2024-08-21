import FakerApi from '@/lib/fakerApi'
import type { Response, User } from './types'

const api = new FakerApi()

async function login(body: Pick<User, 'username' | 'password'>) {
    const response = (await api.post('/login', body)) as Response

    if (response.success) {
        const profileResponse = await profile()

        return { ...response, data: profileResponse.data }
    }

    return response
}

async function logout() {
    const response = (await api.post('/logout', {})) as Response

    return response
}

async function register(body: Pick<User, 'name' | 'username' | 'password'>) {
    const response = (await api.post('/register', body)) as Response

    return response
}

async function profile() {
    const response = (await api.get('/me', {})) as Response<User>

    let user
    if (response.data) {
        const { password, ...data } = response.data
        user = data
    }

    return { success: response.success, data: user }
}

export { login, logout, profile, register }
