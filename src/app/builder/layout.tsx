import type { Metadata } from "next"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs"


export const metadata: Metadata = {
    title: 'Hireme | Builder',
    description: 'Build your professional ATS resume and cover letter in just 5 minutes and with our AI-powered resume enhancer.',
}

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ClerkLoading>
                <main className="h-full w-full mx-auto flex items-center justify-center">
                    <LoadingSpinner />
                </main>
            </ClerkLoading>
            <ClerkLoaded>
                <main className="relative h-full w-full bg-background">
                    {children}
                </main>
            </ClerkLoaded>
        </>
    )
}