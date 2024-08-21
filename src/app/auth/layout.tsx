'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '../providers/auth-provider'

interface AppLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout({ children }: AppLayoutProps) {
    const { isAuthenticated } = useAuth()
    const { push } = useRouter()

    if (isAuthenticated) {
        push('/')
        return
    }
    return <main className="min-h-screen">{children}</main>
}
