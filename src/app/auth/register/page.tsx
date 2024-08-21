import RegisterImage from '@/assets/register_page.svg'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { RegisterForm } from './register-form'

export default function RegisterPage() {
    return (
        <div className="flex flex-col justify-between lg:grid lg:grid-cols-3 min-h-screen">
            <div
                className={cn(
                    'hidden order-2 px-6 h-full border-r border-foreground/5 bg-card',
                    'lg:col-span-2 lg:order-1 lg:flex lg:flex-col lg:justify-center lg:items-center'
                )}
            >
                <Image
                    className="xl:w-3/6 lg:w-4/6"
                    src={RegisterImage}
                    alt="Mulher em frente de um formulário"
                />
            </div>
            <div className="order-1 lg:order-1 lg:col-span-1 flex flex-col bg-background items-center justify-center p-2">
                <div className="w-full max-w-[420px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font font-semibold tracking-tight text-card-foreground">
                            Registrar
                        </h1>
                    </div>
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}
