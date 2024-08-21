'use client'

import { api } from '@/app/http'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import Loading from '../loading'
import { Posts } from './posts'

export function CommunityPosts() {
    const { data, isError, isPending } = useQuery({
        queryKey: ['posts'],
        queryFn: api.posts.getAll,
    })

    if (isPending) {
        return <Loading />
    }

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
