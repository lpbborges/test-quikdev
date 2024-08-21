'use client'

import { api } from '@/app/http'
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

const formSchema = z
    .object({
        name: z.string().min(1, 'Nome não informado.'),
        username: z
            .string()
            .min(1, 'Nome de usuário não informado.')
            .regex(
                /^[a-zA-Z][a-zA-Z0-9_-]*$/,
                'Nome de usuário deve iniciar com uma letra e apenas conter letras, números, traços e underlines.'
            ),
        password: z.string().min(8, 'Tamanho mínimo da senha: 8.'),
        confirmPassword: z
            .string()
            .min(1, 'Confirmação de senha não informada.'),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'As senhas devem ser iguais.',
        path: ['confirmPassword'],
    })

type FormData = z.infer<typeof formSchema>

export function RegisterForm() {
    const { toast } = useToast()
    const { push } = useRouter()
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
    })

    const { isSubmitting } = form.formState

    async function onSubmit(values: FormData) {
        const { confirmPassword, ...data } = values

        try {
            const response = await api.auth.register(data)

            toast({ description: response.message })
            push('/auth/login')
        } catch (err: any) {
            console.error('Failed to register:', err)
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
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
                <div className="lg:flex lg:items-start lg:justify-between gap-2">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="w-full">
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
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Confirmação de senha</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="********"
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

                <div className="w-full flex flex-col items-center space-y-2">
                    <Button className="w-full gap-2" type="submit">
                        {isSubmitting && (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        )}
                        Cadastrar
                    </Button>
                    <Link href="/auth/login" className="mt-4 hover:underline">
                        Voltar
                    </Link>
                </div>
            </form>
        </Form>
    )
}
