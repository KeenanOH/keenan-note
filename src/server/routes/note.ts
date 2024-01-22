import { z } from "zod"

import {authenticatedProcedure, publicProcedure, router} from "@/server/trpc"
import { prisma } from "@/utils/prisma"
import { TRPCError } from "@trpc/core"

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
                    id: input.id,
                    userId: ctx.user.id
                }
            })

            return { id }
        }),
    getNotes: authenticatedProcedure
        .query(async ({ ctx }) => {
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
            const note = await prisma.note.findFirst({
                where: {
                    id: input.id,
                    OR: [
                        {
                            public: true
                        },
                        {
                            userId: ctx.user?.id
                        }
                    ]
                }
            })

            if (!note)
                throw new TRPCError({ code: "NOT_FOUND" })

            return note
        }),
    deleteNote: authenticatedProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            await prisma.note.delete({
                where: {
                    id: input.id,
                    userId: ctx.user.id
                }
            })
        })
})
