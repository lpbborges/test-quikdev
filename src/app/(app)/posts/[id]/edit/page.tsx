'use client'

import { api } from '@/app/http'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle } from 'lucide-react'
import { EditPostForm } from './edit-post-form'
import Loading from './loading'

export default function EditPostPage({ params }: { params: { id: string } }) {
    const id = Number(params.id)
    const { data, isError, isPending } = useQuery({
        queryKey: ['posts', id],
        queryFn: () => api.posts.findOne(id),
    })

    if (isPending) {
        return <Loading />
    }

    if (isError || !data || !data.data) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>Falha ao carregar post</AlertDescription>
            </Alert>
        )
    }

    const { data: post } = data

    return (
        <div className="w-full">
            <EditPostForm post={post} />
        </div>
    )
}
