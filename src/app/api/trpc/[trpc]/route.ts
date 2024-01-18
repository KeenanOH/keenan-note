import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

import { appRouter } from "@/server/app"
import { createContext } from "@/server/context"


function handler(request: Request) {
    return fetchRequestHandler({
        endpoint: "/api/trpc",
        req: request,
        router: appRouter,
        createContext
    })
}

export { handler as GET, handler as POST }
