'use client'

import { api } from '@/app/http'
import type { Post } from '@/app/http/types'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface EditPostFormProps {
    post: Post
}

const formSchema = z.object({
    postId: z.number(),
    title: z.string().min(1, 'Título não informado.'),
    content: z.string().min(1, 'Conteúdo não informado.'),
})

export function EditPostForm({ post }: EditPostFormProps) {
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: api.posts.update,
        onSuccess: response => {
            queryClient
                .invalidateQueries({
                    queryKey: ['user-posts', 'posts'],
                })
                .then(() => {
                    toast({
                        description: response.message,
                    })
                })
        },
        onError: err => {
            toast({
                variant: 'destructive',
                description: err.message,
            })
        },
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            postId: post.id,
            title: post.title,
            content: post.content,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutate({
            post_id: values.postId,
            post: { ...values },
        })
    }

    return (
        <div className="w-full">
            <div className="flex flex-col">
                <h1 className="text-3xl font-medium">Post</h1>
                <Separator className="my-5" />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center w-full">
                            <div>
                                <h2 className="text-lg font-medium text-foreground">
                                    Editando
                                </h2>
                            </div>
                            <div className="hidden items-center gap-2 lg:flex">
                                <Button variant="outline" type="button" asChild>
                                    <Link href="/">Voltar</Link>
                                </Button>
                                <Button type="submit" className="gap-2">
                                    {mutation.isPending && (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    )}
                                    Salvar
                                </Button>
                            </div>
                        </div>
                        <FormField
                            control={form.control}
                            name="postId"
                            render={({ field }) => (
                                <FormControl>
                                    <Input type="hidden" {...field} />
                                </FormControl>
                            )}
                        />
                        <Separator className="my-4" />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Título</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Título"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem className="mt-8">
                                    <FormLabel>Conteúdo</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Conte-nos o que está na sua mente"
                                            className="resize-none"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            rows={6}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="lg:hidden block">
                            <Separator className="my-4" />
                            <div className="mt-4 lg:hidden items-center gap-2 flex justify-end">
                                <Button variant="outline" type="button" asChild>
                                    <Link href="/">Voltar</Link>
                                </Button>
                                <Button type="submit" className="gap-2">
                                    {mutation.isPending && (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    )}
                                    Publicar
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
