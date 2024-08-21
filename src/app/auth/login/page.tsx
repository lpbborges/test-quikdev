import LoginImage from '@/assets/login_page.svg'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { LoginForm } from './login-form'

export default function Loginpage() {
    return (
        <div className="flex flex-col justify-between lg:grid lg:grid-cols-3 min-h-screen">
            <div
                className={cn(
                    'hidden order-2 py-10 px-6 h-full border-r border-foreground/5 bg-card',
                    'lg:col-span-2 lg:order-1 lg:flex lg:justify-center lg:items-center'
                )}
            >
                <Image
                    className="xl:w-3/6 lg:w-4/6"
                    src={LoginImage}
                    alt="Homem abrindo uma porta"
                />
            </div>
            <div className="order-1 lg:order-2 lg:col-span-1 flex flex-col bg-background items-center justify-center p-6">
                <div className="w-full max-w-[420px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font font-semibold tracking-tight text-card-foreground">
                            Acessar
                        </h1>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}
