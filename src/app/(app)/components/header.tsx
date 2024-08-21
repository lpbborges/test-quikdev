'use client'

import { api } from '@/app/http'
import { useAuth } from '@/app/providers/auth-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Moon, Power, Shapes, SquarePen, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Header() {
    const { setTheme } = useTheme()
    const { replace } = useRouter()
    const { getUser, removeUser } = useAuth()
    const user = getUser()

    async function handleLogout() {
        api.auth.logout().then(() => {
            removeUser()
            replace('/auth/login')
        })
    }

    return (
        <header className="border-b flex items-center justify-between h-12 w-full px-8 py-2">
            <Link href="/" className="flex items-center gap-2">
                <Shapes className="w-6 h-6" />
                <span className="hidden lg:block text-xl">ACME inc.</span>
            </Link>
            <div className="flex items-center gap-6">
                <Link
                    href="/posts/new"
                    className="flex items-center gap-2 hover:opacity-50 dark:hover:brightness-50"
                >
                    <SquarePen className="h-5 w-5" />
                    Publicar
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8 rounded-full border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        >
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme('light')}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme('dark')}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme('system')}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer w-8 h-8">
                            <AvatarImage src="https://avatar.iran.liara.run/public/32" />
                            <AvatarFallback>{user?.name[0]}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={handleLogout} asChild>
                            <Button
                                className="w-full flex items-center justify-start cursor-pointer focus-visible:ring-0 focus-visible:ring-offset-0"
                                variant="ghost"
                            >
                                <Power className="mr-2 h-4 w-4" />
                                Sair
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
