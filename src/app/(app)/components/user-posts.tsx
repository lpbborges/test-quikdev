'use client'

import { api } from '@/app/http'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import { Posts } from './posts'

interface UserPosts {
    userId?: number
}

export function UserPosts({ userId }: UserPosts) {
    const { data, isError } = useQuery({
        queryKey: ['user-posts', userId],
        queryFn: api.posts.getAllByUser,
    })

    if (isError) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>Falha ao carregar posts</AlertDescription>
            </Alert>
        )
    }

    return <Posts posts={data?.data ?? []} />
}
