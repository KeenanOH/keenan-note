import { getServerSession } from "next-auth"
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch"

import { nextAuthOptions } from "@/utils/nextAuth"
import { prisma } from "@/utils/prisma"

export async function createContext(opts?: FetchCreateContextFnOptions) {
    const session = await getServerSession(nextAuthOptions)

    const user = session?.user && await prisma.user.findFirst({
        where: {
            email: session.user.email
        }
    })

    return {
        user, prisma
    }
}

export type Context = Awaited<ReturnType<typeof createContext>>
