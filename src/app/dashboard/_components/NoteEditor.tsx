"use client"

import React, {useState} from "react"
import MarkdownEditor from "@/app/_components/MarkdownEditor"
import {trpc} from "@/utils/trpc"
import {Button} from "@/components/ui/button"
import {EditIcon, LinkIcon} from "lucide-react"
import {toast} from "sonner"
import Link from "next/link"

export default function NoteEditor({ noteId }: { noteId: string }) {

    const note = trpc.note.getNote.useQuery({ id: noteId })
    const updateNote = trpc.note.updateNote.useMutation()

    const [editing, setEditing] = useState(false)

    async function saveNote() {
        if (!note.data) return

        await updateNote.mutateAsync({
            id: note.data.id,
            name: note.data.name,
            content: note.data.content
        })
    }

    return (
        <div className="w-full">
            <div className="flex items-center">
                { note.data &&
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        { note.data.name }
                    </h3>
                }

                <div className="flex items-center ml-auto">
                    <Link href={ `/notes/${noteId}` } target="_blank" rel="noopener noreferrer">
                        <Button
                            variant="ghost"
                            size="icon"
                        >
                            <LinkIcon />
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={ () => setEditing(editing => !editing) }
                    >
                        <EditIcon />
                    </Button>

                    { editing &&
                        <Button
                            onClick={ () => {
                                toast.promise(saveNote(), {
                                    loading: "Loading...",
                                    success: () => {
                                        setEditing(false)
                                        return "Successfully saved note!"
                                    },
                                    error: (error: Error) => {
                                        return error.message
                                    },
                                    duration: 1000
                                })
                            } }
                        >
                            Save
                        </Button>
                    }
                </div>
            </div>
            { note.data &&
                <div className="rounded-md border h-[calc(100vh-100px)]">
                    <MarkdownEditor
                        content={ note.data.content }
                        editing={ editing }
                        onChange={ content => {
                            if (note.data)
                                note.data.content = content
                        } }
                    />
                </div>

            }
        </div>
    )
}
