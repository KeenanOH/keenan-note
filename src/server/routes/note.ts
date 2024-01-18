import { z } from "zod"

import {authenticatedProcedure, publicProcedure, router} from "@/server/trpc"
import { prisma } from "@/utils/prisma"

export const noteRouter = router({
    createNote: authenticatedProcedure
        .input(z.object({
            name: z.string(),
            content: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            const { id, name } = await prisma.note.create({
                data: {
                    userId: ctx.user.id,
                    name: input.name,
                    content: input.content,
                    public: false
                }
            })

            return { id, name, public: false }
        }),
    updateNote: authenticatedProcedure
        .input(z.object({
            id: z.string(),
            name: z.optional(z.string()),
            content: z.optional(z.string()),
            public: z.optional(z.boolean())
        }))
        .mutation(async ({ ctx, input }) => {
            const { id } = await prisma.note.update({
                data: {
                    name: input.name,
                    content: input.content,
                    public: input.public
                },
                where: {
                    id: input.id
                }
            })

            return { id }
        }),
    getNotes: authenticatedProcedure
        .query(async ({ ctx, input }) => {
            return prisma.note.findMany({
                where: {
                    userId: ctx.user.id
                },
                select: {
                    id: true,
                    name: true,
                    public: true
                }
            })
        }),
    getNote: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .query(async ({ ctx, input }) => {
            if (ctx.user)
                return prisma.note.findFirst({
                    where: {
                        id: input.id,
                        userId: ctx.user.id
                    }
                })

            return prisma.note.findFirst({
                where: {
                    id: input.id,
                    public: true
                }
            })
        })
})
