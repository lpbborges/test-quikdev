'use client'

import { api } from '@/app/http'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function PostPage({ params }: { params: { id: string } }) {
    const id = Number(params.id)
    const { data, isError, isPending } = useQuery({
        queryKey: ['posts', id],
        queryFn: () => api.posts.findOne(id),
    })

    if (isPending) {
        return
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
        <>
            <div className="w-full flex justify-end">
                <Link
                    href="/"
                    className="flex items-center gap-1 hover:underline"
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="text-sm">Voltar</span>
                </Link>
            </div>
            <section>
                <article>
                    <h1 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
                        {post.title}
                    </h1>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                        {post.content}
                    </p>
                </article>
            </section>
        </>
    )
}
