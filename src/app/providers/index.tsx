'use client'

import AuthProvider from './auth-provider'

interface ProvidersProps {
    children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
    return <AuthProvider>{children}</AuthProvider>
}
