import { createCaller } from "@/server/app"
import { prisma } from "./prisma"
import { userId } from "./auth"

export const unauthenticatedTrpc = createCaller({
    prisma,
    user: undefined
})

export const authenticatedTrpc = createCaller({
    prisma,
    user: {
        id: userId,
        name: null,
        email: null,
        emailVerified: null,
        image: null
    }
})

export const secondaryAuthenticatedTrpc = createCaller({
    prisma,
    user: {
        id: "clrlglsxm000108l8423a8bwk",
        name: null,
        email: null,
        emailVerified: null,
        image: null
    }
})
