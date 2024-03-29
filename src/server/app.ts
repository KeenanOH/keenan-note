import { getServerSession } from "next-auth"

import { noteRouter } from "@/server/routes/note"
import { createCallerFactory, router } from "@/server/trpc"
import { nextAuthOptions } from "@/utils/nextAuth"
import { prisma } from "@/utils/prisma"
import {sectionRouter} from "@/server/routes/section"
import {newNotesRouter} from "@/server/routes/notes_v2"

export const appRouter = router({
    note: noteRouter,
    newNote: newNotesRouter,
    section: sectionRouter
})
export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)

export async function useServerSession() {
    const session = await getServerSession(nextAuthOptions)

    const user = session?.user && await prisma.user.findFirst({
        where: {
            email: session.user.email
        }
    })

    return { caller: createCaller({ prisma, user }), user: user }
}
