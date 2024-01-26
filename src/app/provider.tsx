"use client"

import React, { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/react-query"
import { SessionProvider } from "next-auth/react"

import { trpc } from "@/utils/trpc"
import DndProvider from "@/app/_providers/DndProvider"

function getBaseUrl() {
    if (typeof window !== "undefined")
        return ""

    if (process.env.VERCEL_URL)
        return `https://${process.env.VERCEL_URL}`

    return `http://localhost:${process.env.PORT ?? 3000}`
}


export function Provider({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`
                })
            ]
        })
    )

    return (
        <trpc.Provider queryClient={ queryClient } client={ trpcClient }>
            <QueryClientProvider client={ queryClient }>
                <SessionProvider>
                    <DndProvider>
                        { children }
                    </DndProvider>
                </SessionProvider>
            </QueryClientProvider>
        </trpc.Provider>
    )
}
