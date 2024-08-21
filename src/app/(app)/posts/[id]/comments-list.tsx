import { api } from '@/app/http'
import type { Post } from '@/app/http/types'
import { useAuth } from '@/app/providers/auth-provider'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { XCircle } from 'lucide-react'
import type { HTMLAttributes } from 'react'

interface CommentsListProps extends HTMLAttributes<HTMLUListElement> {
    post: Post
}

export function CommentsList({ post, ...props }: CommentsListProps) {
    const { getUser } = useAuth()
    const { toast } = useToast()
    const queryClient = useQueryClient()

    const user = getUser()

    const mutation = useMutation({
        mutationFn: api.comments.remove,
        onSuccess: response => {
            queryClient
                .invalidateQueries({ queryKey: ['posts', post.id] })
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

    if (post.comments.length <= 0) {
        return <p className="mt-4 italic">Sem comentários</p>
    }

    return (
        <ul {...props}>
            {post.comments.map(comment => (
                <li key={comment.id} className="border-b pb-4 first:mt-0 mt-6">
                    {user?.id === comment.user_id && (
                        <div className="w-full flex justify-end pb-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="rounded-full w-5 h-5 hover:bg-transparent hover:brightness-50"
                                    >
                                        <XCircle className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Tem certeza que deseja excluir este
                                            comentário?
                                        </AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancelar
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => {
                                                mutation.mutate({
                                                    comment_id: comment.id,
                                                    post_id: post.id,
                                                })
                                            }}
                                        >
                                            Confirmar
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )}
                    <p>{comment.content}</p>
                </li>
            ))}
        </ul>
    )
}
