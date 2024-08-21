'use client'

import AuthProvider from './auth-provider'
import QueryClientProvider from './query-client-provider'

interface ProvidersProps {
    children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <AuthProvider>
            <QueryClientProvider>{children}</QueryClientProvider>
        </AuthProvider>
    )
}
