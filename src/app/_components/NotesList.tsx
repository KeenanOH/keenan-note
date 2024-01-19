import React, { useState } from "react"
import { DefaultDataTransformer, DefaultErrorShape, RootConfig } from "@trpc/core"
import { PrismaClient } from "@prisma/client"
import { UseTRPCQueryResult } from "@trpc/react-query/shared"
import { TRPCClientErrorLike } from "@trpc/client"

import { ScrollArea } from "@/components/ui/scroll-area"
import NoteListCell from "@/app/_components/NoteListCell"
import CreateNoteDialog from "@/app/_components/CreateNoteDialog"

export type NotesType = UseTRPCQueryResult<
    { id: string, name: string, public: boolean }[],
    TRPCClientErrorLike<
        RootConfig<
            {
                ctx: {
                    user: {
                        id: string,
                        name: string | null,
                        email: string | null,
                        emailVerified: Date | null,
                        image: string | null
                    } | null | undefined,
                    prisma: PrismaClient
                },
                meta: object,
                errorShape: DefaultErrorShape,
                transformer: DefaultDataTransformer
            }
        >
    >
>

export default function NotesList({ notes, onClick }: { notes: NotesType, onClick: (note: { id: string, name: string, public: boolean }) => void }) {

    const [open, setOpen] = useState(false)

    return (
        <div className="w-48 rounded-md border max-h-screen">
            <div className="p-4">
                <div className="flex items-center pb-8">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Notes</h3>
                    <CreateNoteDialog open={ open } onOpenChange={ setOpen } notes={ notes } />
                </div>

                <ScrollArea>
                    <h4 className="mb-4 text-sm font-medium leading-none">Public</h4>
                    { notes.data &&
                        notes.data
                            .filter(note => note.public)
                            .map(note =>
                                <NoteListCell key={ note.id } note={ note } onClick={ onClick } />
                            )

                    }
                    <h4 className="mt-8 mb-4 text-sm font-medium leading-none">Private</h4>
                    { notes.data &&
                        notes.data
                            .filter(note => !note.public)
                            .map(note =>
                                <NoteListCell key={ note.id } note={ note } onClick={ onClick } />
                            )

                    }
                </ScrollArea>
            </div>
        </div>
    )
}
