'use client'

import { api } from '@/app/http'
import type { Post } from '@/app/http/types'
import { useAuth } from '@/app/providers/auth-provider'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { EllipsisVertical, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface PostsProps {
    posts: Post[]
    redirectToEdit?: boolean
}

interface PostProps {
    post: Post
}

export function Posts({ posts }: PostsProps) {
    if (posts.length <= 0) {
        return <p className="italic mt-4">Sem posts</p>
    }

    return (
        <ul>
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </ul>
    )
}

export function Post({ post }: PostProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const queryClient = useQueryClient()
    const { getUser } = useAuth()
    const { toast } = useToast()
    const user = getUser()

    const mutation = useMutation({
        mutationFn: api.posts.remove,
        onSuccess: response => {
            queryClient
                .invalidateQueries({ queryKey: ['user-posts', 'posts'] })
                .then(() => {
                    toast({
                        description: response.message,
                    })
                    setIsMenuOpen(false)
                    window.location.reload()
                })
        },
    })

    return (
        <Link
            href={`/posts/${post.id}`}
            className="w-full block border-b h-full p-4 [&:not(:first-child)]:mt-3"
        >
            <h2 className="scroll-m-20  pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
                {post.title}
            </h2>
            <p className="line-clamp-3 leading-7 mt-3">{post.content}</p>
            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2">
                    <MessageSquare className=" w-4 h-4" />
                    <span className="text-sm">
                        {post.comments?.length ?? 0}
                    </span>
                </div>
                {post.user_id === user?.id && (
                    <DropdownMenu
                        open={isMenuOpen}
                        onOpenChange={() => {
                            setIsMenuOpen(!isMenuOpen)
                        }}
                    >
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="z-10 rounded-full w-6 h-6 hover:bg-transparent dark:hover:brightness-50"
                            >
                                <EllipsisVertical className="h-5 w-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                asChild
                                className="cursor-pointer"
                            >
                                <Link href={`/posts/${post.id}/edit`}>
                                    Editar
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className={cn(
                                                'z-20 h-8 w-full justify-start px-2 py-1.5',
                                                'text-sm rounded-sm font-normal text-destructive cursor-pointer'
                                            )}
                                            onClick={(e: any) => {
                                                e.stopPropagation()
                                            }}
                                        >
                                            Deletar
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent
                                        onClick={(e: any) =>
                                            e.stopPropagation()
                                        }
                                    >
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Tem certeza que deseja
                                                continuar?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Essa ação não pode ser desfeita.
                                                Após a confirmação não será
                                                possível recuperar o seu post.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel
                                                onClick={(e: any) => {
                                                    e.stopPropagation()
                                                }}
                                            >
                                                Cancelar
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={(e: any) => {
                                                    e.stopPropagation()
                                                    mutation.mutate(post.id)
                                                }}
                                            >
                                                Confirmar
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </div>
        </Link>
    )
}
