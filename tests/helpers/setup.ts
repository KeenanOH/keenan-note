import { beforeAll } from "vitest"

import { prisma } from "./prisma"
import { userId } from "./auth"

export const privateNote = {
    id: "clrldpgr7000008la1w1ver7n",
    userId,
    name: "My Note",
    content: "This is my note!",
    public: false
}

export const publicNote = {
    id: "clrldpmn4000108laeyxkd243",
    userId,
    name: "My Public Note",
    content: "This is my public note!",
    public: true
}

beforeAll(async () => {
    try {
        await prisma.user.create({
            data: {
                id: userId
            }
        })

        await prisma.note.create({
            data: privateNote
        })

        await prisma.note.create({
            data: publicNote
        })
    } catch {
        // skipping...
    }
})
