import { z } from "zod"

import { authenticatedProcedure, router } from "@/server/trpc"

export const sectionRouter = router({
    getSections: authenticatedProcedure
        .query(async ({ ctx }) =>
            await ctx.prisma.section.findMany({
                where: {
                    userId: ctx.user.id
                },
                select: {
                    id: true,
                    name: true,
                    position: true
                }
            })
        ),
    createSection: authenticatedProcedure
        .input(z.object({
            name: z.string()
        }))
        .mutation(async ({ ctx, input }) =>
            await ctx.prisma.section.create({
                data: {
                    userId: ctx.user.id,
                    name: input.name
                },
                select: {
                    id: true,
                    name: true,
                    position: true
                }
            })
        ),
    updateSection: authenticatedProcedure
        .input(z.object({
            id: z.string(),
            name: z.optional(z.string()),
            position: z.optional(z.number())
        }))
        .mutation(async ({ ctx, input }) =>
            await ctx.prisma.section.update({
                data: {
                    name: input.name,
                    position: input.position
                },
                where: {
                    id: input.id,
                    userId: ctx.user.id
                },
                select: {
                    id: true,
                    name: true,
                    position: true
                }
            })
        ),
    deleteSection: authenticatedProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async ({ ctx, input }) =>
            await ctx.prisma.section.delete({
                where: {
                    id: input.id,
                    userId: ctx.user.id
                },
                select: {
                    id: true
                }
            })
        )
})
