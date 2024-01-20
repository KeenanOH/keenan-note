import { expect, describe, it } from "vitest"
import { TRPCError } from "@trpc/core"

import { publicNote, privateNote } from "../../helpers/setup"
import { authenticatedTrpc, secondaryAuthenticatedTrpc, unauthenticatedTrpc } from "../../helpers/trpc"

describe("Read Note", () => {

    it("should allow an unauthenticated user to view a public note", async () =>
        expect(await unauthenticatedTrpc.note.getNote({ id: publicNote.id }))
            .toEqual(publicNote)
    )

    it("should allow the note's owner to view the public note", async () =>
        expect(await authenticatedTrpc.note.getNote({ id: publicNote.id }))
            .toEqual(publicNote)
    )

    it("should allow a random user to view the public note", async () =>
        expect(await secondaryAuthenticatedTrpc.note.getNote({ id: publicNote.id }))
            .toEqual(publicNote)
    )

    it("should not allow an unauthenticated user to view a private note", () =>
        expect(unauthenticatedTrpc.note.getNote({ id: privateNote.id }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should allow a user to view their own private note", async () =>
        expect(await authenticatedTrpc.note.getNote({ id: privateNote.id }))
            .toEqual(privateNote)
    )

    it("should not allow a random user to view someone else's private note", () =>
        expect(secondaryAuthenticatedTrpc.note.getNote({ id: privateNote.id }))
            .rejects
            .toThrow(TRPCError)
    )

})

describe("List Notes", () => {

    it("should not allow an unauthenticated user to read notes", () =>
        expect(unauthenticatedTrpc.note.getNotes())
            .rejects
            .toThrow(TRPCError)
    )

    it("should allow a user to read their own notes", async () =>
        expect(await authenticatedTrpc.note.getNotes())
            .toBeDefined()
    )

})

describe("Create Note", () => {

    it("should not allow an unauthenticated user to create a note", () =>
        expect(unauthenticatedTrpc.note.createNote({ name: "My new note", content: "" }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should allow a user to create a note", async () =>
        expect(await authenticatedTrpc.note.createNote({ name: "My new note", content: "" }))
            .toBeDefined()
    )

})

describe("Update Note", () => {

    it("should not allow an unauthenticated user to update a public note", () =>
        expect(unauthenticatedTrpc.note.updateNote({ id: publicNote.id, content: "new content" }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should allow a user to update their own public note", async () =>
        expect(await authenticatedTrpc.note.updateNote({ id: publicNote.id, content: "new content" }))
            .toBeDefined()
    )

    it("should not allow a user to update a public note they do not own", () =>
        expect(secondaryAuthenticatedTrpc.note.updateNote({ id: publicNote.id, content: "new content" }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should not allow an unauthenticated user to update a private note", () =>
        expect(unauthenticatedTrpc.note.updateNote({ id: privateNote.id, content: "new content" }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should allow a user to update their own private note", async () =>
        expect(await authenticatedTrpc.note.updateNote({ id: privateNote.id, content: "new content" }))
            .toBeDefined()
    )

    it("should not allow a user to update a private note they do not own", () =>
        expect(secondaryAuthenticatedTrpc.note.updateNote({ id: privateNote.id, content: "new content" }))
            .rejects
            .toThrow(TRPCError)
    )

})
