"use client"

import { useState } from "react"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { EditIcon } from "lucide-react"
import { toast } from "sonner"

import { trpc } from "@/utils/trpc"
import NotesList from "@/app/_components/NotesList"
import MarkdownEditor from "@/app/_components/MarkdownEditor"
import { Button } from "@/components/ui/button"
import Show from "@/app/_components/Show"
import LoadingScreen from "@/app/_components/LoadingScreen";

export default function Home() {

    const session = useSession()
    const notes = trpc.note.getNotes.useQuery()
    const [noteId, setNoteId] = useState("")
    const updateNote = trpc.note.updateNote.useMutation()
    const note = trpc.note.getNote.useQuery({ id: noteId ?? "" }, {
        enabled: false,
    })
    const [currentNote, setCurrentNote] = useState<{
        id: string,
        name: string,
        content: string,
        userId: string,
        public: boolean
    }>()

    const [isEditing, setIsEditing] = useState(false)

    if (session.status === "loading")
        return <LoadingScreen />

    if (!session.data?.user)
        redirect("/api/auth/signin")

    return (
        <div className="flex flex-col md:flex-row p-8 gap-x-8 h-screen">
            <div>
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">{ session.data.user.name }</h2>
                <NotesList
                    notes={ notes }
                    onClick={ (n) => {
                        setNoteId(n.id)
                        note.refetch()
                            .then(d => {
                                setCurrentNote(d.data ?? undefined)
                            })
                    } }
                />
            </div>
            <div className="w-full">
                <div className="flex items-center">
                    { currentNote &&
                        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            { currentNote.name }
                        </h3>
                    }

                    <div className="flex items-center ml-auto">
                        <Button
                            variant="ghost"
                            onClick={ () => setIsEditing(isEditing => !isEditing) }
                        >
                            <EditIcon />
                        </Button>

                        <Show bool={ isEditing }>
                            <Button
                                onClick={ () => {
                                    if (!currentNote) return

                                    const promise = async () => {
                                        if (!currentNote) return

                                        await updateNote.mutateAsync({
                                            id: currentNote.id,
                                            name: currentNote.name,
                                            content: currentNote.content
                                        })

                                        console.log("Saved: content:", currentNote.content)
                                    }

                                    toast.promise(promise(), {
                                        loading: "Loading...",
                                        success: () => {
                                            setIsEditing(false)
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
                        </Show>
                    </div>
                </div>
                <ScrollArea className="rounded-md border h-[calc(100vh-100px)]">
                    { currentNote &&
                        <MarkdownEditor
                            content={ currentNote.content }
                            editing={ isEditing }
                            onChange={ content => {
                                if (!currentNote) return

                                setCurrentNote(note => {
                                    if (!note) return

                                    return {
                                        id: note.id,
                                        name: note.name,
                                        content,
                                        userId: note.userId,
                                        public: note.public
                                    }
                                })
                            } }
                        />
                    }
                </ScrollArea>
            </div>
        </div>
    )
}
