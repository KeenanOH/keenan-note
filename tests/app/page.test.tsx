import React from "react"
import { describe, it, expect, beforeAll, vi, afterAll } from "vitest"
import { useSession } from "next-auth/react"
import { render } from "@testing-library/react"

import Home from "@/app/page"
import { Provider } from "@/app/provider"



describe("Home Page Tests", () => {

    beforeAll(() => {
        const mocks = vi.hoisted(() => {
            return {
                useSession: vi.fn()
            }
        })

        vi.mock("next-auth/react", async () => {
            const originalModule = await vi.importActual<typeof import("next-auth/react")>("next-auth/react")

            return {
                ...originalModule,
                useSession: mocks.useSession
            }
        })

        vi.mocked(useSession)
            .mockReturnValue({
                data: null,
                status: "unauthenticated",
                update: async () => null
            })
    })

    it("should redirect an unauthenticated user to the login page", () => {
        expect(() =>
            render(
                <Provider>
                    <Home />
                </Provider>
            )
        )
            .toThrowError("NEXT_REDIRECT")
    })

    afterAll(() => {
        vi.resetAllMocks()
    })

})
