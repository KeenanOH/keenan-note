import { noteRouter } from "@/server/routes/note"
import { createCallerFactory, router } from "@/server/trpc"

export const appRouter = router({
    note: noteRouter
})
export type AppRouter = typeof appRouter

export const createCaller = createCallerFactory(appRouter)
