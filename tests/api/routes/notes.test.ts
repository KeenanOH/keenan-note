import { unauthenticatedTrpc, authenticatedTrpc } from "../../helpers/trpc"
import { TRPCError } from "@trpc/core"

describe("Notes Tests", () => {

    describe("Read Notes", () => {

        it("should not allow a unauthenticated read", async () => {
            await expect(unauthenticatedTrpc.note.getNotes())
                .rejects
                .toThrow(TRPCError)
        })

        it("should allow a authenticated user to read", async () => {
            await expect(authenticatedTrpc.note.getNotes())
                .resolves
                .toBeDefined()
        })

    })

    describe("Read Note", () => {

        it("should not allow a unauthenticated read", async () => {
            await expect(unauthenticatedTrpc.note.getNote({ id: "1" }))
                .rejects
                .toThrow(TRPCError)
        })

        it("should allow an authenticated user to read", async () => {
            await expect(authenticatedTrpc.note.getNote({ id: "1" }))
                .resolves
                .toBeDefined()
        })

    })


})
