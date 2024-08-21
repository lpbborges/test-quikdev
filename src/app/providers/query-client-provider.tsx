'use client'

import {
    isServer,
    QueryClient,
    QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query'

function makeQueryClient() {
    return new QueryClient()
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
    if (isServer) {
        return makeQueryClient()
    } else {
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient()
        }

        return browserQueryClient
    }
}

interface QueryClientContextProps {
    children: React.ReactNode
}

export default function QueryClientProvider({
    children,
}: QueryClientContextProps) {
    const queryClient = getQueryClient()

    return (
        <ReactQueryClientProvider client={queryClient}>
            {children}
        </ReactQueryClientProvider>
    )
}
