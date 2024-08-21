'use client'

interface AppLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout({ children }: AppLayoutProps) {
    return <main className="min-h-screen">{children}</main>
}
