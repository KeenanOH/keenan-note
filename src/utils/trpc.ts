import { createTRPCReact } from "@trpc/react-query"

import { AppRouter } from "@/server/app"

export const trpc = createTRPCReact<AppRouter>()
