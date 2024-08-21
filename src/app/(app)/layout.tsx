'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '../providers/auth-provider'
import { Header } from './components'

interface AppLayoutProps {
    children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { isAuthenticated } = useAuth()
    const { replace } = useRouter()

    if (!isAuthenticated) {
        replace('/auth/login')
        return
    }

    return (
        <div className="min-h-screen flex flex-col items-center">
            <Header />
            <main className="max-h-screen w-full max-w-[800px] px-8 py-6">
                {children}
            </main>
        </div>
    )
}
