import { z } from "zod"

import {authenticatedProcedure, publicProcedure, router} from "@/server/trpc"
import {prisma} from "@/utils/prisma"
import {TRPCError} from "@trpc/core"


export const newNotesRouter = router({
    getNotes: authenticatedProcedure
        .query(async ({ ctx }) =>
            await ctx.prisma.note.findMany({
                where: {
                    userId: ctx.user.id,
                },
                select: {
                    id: true,
                    name: true,
                    sectionId: true,
                    position: true,
                    public: true
                },
                orderBy: {
                    position: "asc"
                }
            })
        ),
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
    createNote: authenticatedProcedure
        .input(z.object({
            name: z.string(),
            sectionId: z.optional(z.string()),
            position: z.optional(z.number())
        }))
        .mutation(async ({ ctx, input }) =>
            await ctx.prisma.note.create({
                data: {
                    name: input.name,
                    sectionId: input.sectionId,
                    position: input.position,
                    userId: ctx.user.id
                },
                select: {
                    id: true,
                    name: true,
                    sectionId: true,
                    position: true
                }
            })
        ),
    updateNote: authenticatedProcedure
        .input(z.object({
            id: z.string(),
            name: z.optional(z.string()),
            content: z.optional(z.string()),
            sectionId: z.optional(z.nullable(z.string())),
            position: z.optional(z.number())
        }))
        .mutation(async ({ ctx, input }) =>
            await ctx.prisma.note.update({
                data: {
                    name: input.name,
                    content: input.content,
                    sectionId: input.sectionId,
                    position: input.position
                },
                where: {
                    id: input.id,
                    userId: ctx.user.id
                },
                select: {
                    id: true,
                    name: true,
                    sectionId: true,
                    position: true
                }
            })
        ),
    deleteNote: authenticatedProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async ({ ctx, input }) =>
            await ctx.prisma.note.delete({
                where: {
                    id: input.id,
                    userId: ctx.user.id
                },
                select: {
                    id: true,
                    name: true,
                    sectionId: true,
                    position: true
                }
            })
        )
})
