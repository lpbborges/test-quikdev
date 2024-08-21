'use client'

import { api } from '@/app/http'
import { useAuth } from '@/app/providers/auth-provider'
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
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
    username: z.string().min(1, 'Usuário não informado.'),
    password: z.string().min(1, 'Senha não informada.'),
})

type FormData = z.infer<typeof formSchema>

export function LoginForm() {
    const { setUser } = useAuth()
    const { toast } = useToast()
    const { push } = useRouter()
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })

    const { isSubmitting } = form.formState

    async function onSubmit(values: FormData) {
        try {
            const response = await api.auth.login(values)

            if (response.success) {
                setUser(response.data)
                push('/')
            }
        } catch (err: any) {
            toast({
                variant: 'destructive',
                description: err.message,
            })
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-4"
            >
                <div>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Usuário</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        autoCapitalize="none"
                                        autoCorrect="off"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="********"
                                        disabled={isSubmitting}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full flex flex-col items-center space-y-2">
                    <Button className="w-full gap-2" type="submit">
                        {isSubmitting && (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        )}
                        Entrar
                    </Button>
                    <Link
                        className="p-2 hover:underline hover:underline-offset-3"
                        href="/auth/register"
                    >
                        Crie sua conta
                    </Link>
                </div>
            </form>
        </Form>
    )
}
