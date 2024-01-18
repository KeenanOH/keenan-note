import { createCaller } from "@/server/app"
import { prismaMock } from "./singleton"

export const unauthenticatedTrpc = createCaller({
    prisma: prismaMock,
    user: undefined
})

export const authenticatedTrpc = createCaller({
    prisma: prismaMock,
    user: {
        id: "myuserid",
        name: null,
        email: null,
        emailVerified: null,
        image: null
    }
})
