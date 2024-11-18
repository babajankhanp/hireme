'use client'

import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="h-full w-full flex justify-center items-center mx-auto">
      <section className="flex flex-col items-center space-y-4 md:space-y-8">
        <Image src="/svg/page-not-found.svg" alt="Page Not Found Icon" width="100" height="100" />
        <h2 className="text-xl md:text-2xl dark:text-white text-neutral-800 font-bold">SOMETHING WENT WRONG</h2>
        <div className="w-full flex items-center gap-2">
          <Button
            variant="ghost"
            className="w-full"
            size="sm"
            onClick={
              () => reset()
            }
          >
            REFRESH
          </Button>
          <Button
            className="bg-app-color translate-hover hover:bg-app-color/80 text-neutral-100 text-sm w-full"
            size="sm"
            onClick={
              () => router.back()
            }
          >
            GO BACK
          </Button>
        </div>

      </section>
    </main>
  )
}