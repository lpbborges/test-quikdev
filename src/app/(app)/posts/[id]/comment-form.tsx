'use client'

import { api } from '@/app/http'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface CommentFormProps {
    postId: number
}

const formSchema = z.object({
    content: z
        .string()
        .min(1, 'Comentário não informado.')
        .max(500, 'Limite de 500 caracteres.'),
})

export function CommentForm({ postId }: CommentFormProps) {
    const { toast } = useToast()
    const { refresh } = useRouter()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: api.comments.create,
        onSuccess: response => {
            queryClient
                .invalidateQueries({ queryKey: ['posts', postId] })
                .then(() => {
                    toast({
                        description: response.message,
                    })
                    refresh()
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
            content: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutate({ post_id: postId, comment: { ...values } })
    }

    return (
        <div className="w-full">
            <div className="flex flex-col">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Compartilhe suas ideias sobre este post..."
                                            className="resize-none"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="mt-3 w-full flex justify-end">
                            <Button type="submit">Comentar</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
