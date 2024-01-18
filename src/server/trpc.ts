import {initTRPC, TRPCError} from "@trpc/core"

import { Context } from "@/server/context"

const t = initTRPC.context<Context>().create()

export const router = t.router

export const publicProcedure = t.procedure
export const authenticatedProcedure = t.procedure.use(async (opts) => {
    const user = opts.ctx.user

    if (!user)
        throw new TRPCError({ code: "UNAUTHORIZED" })

    return opts.next({
        ctx: {
            user: user
        }
    })
})
export const createCallerFactory = t.createCallerFactory
