'use client'

import type { User } from '@/app/http/types'
import { createContext, useContext, useState } from 'react'

interface AuthContext {
    getUser: () => User | null
    setUser: (user: User) => void
    removeUser: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext({} as AuthContext)

interface AuthProviderProps {
    children: React.ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<User | null>(() => {
        const user = window.localStorage.getItem('auth')
        if (user) {
            return JSON.parse(user)
        }

        return null
    })

    function getUser() {
        return data
    }

    function setUser(user: User) {
        setData(user)
    }

    function removeUser() {
        setData(null)
    }

    return (
        <AuthContext.Provider
            value={{
                getUser,
                isAuthenticated: !!data,
                removeUser,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
