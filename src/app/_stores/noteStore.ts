import { create } from "zustand"
import { persist, combine } from "zustand/middleware"
import {Note} from "@/app/dashboard/_components/sidebar/types"

type InitialState = { notes: Note[] }
type SetState = { update: (id: string, sectionId: string | null, position?: number) => void, set: (notes: Note[]) => void }

export const useNoteStore = create(
    persist(
        combine<InitialState, SetState>(
            { notes: [] },
            set => ({
                update: (id, sectionId, position) => set(state => {
                    return {
                        notes: state.notes.map(note => {
                            if (note.id != id)
                                return note

                            if (typeof position === "number")
                                return { ...note, position, sectionId: sectionId }
                            return { ...note, sectionId: sectionId }
                        })
                    }
                }),
                set: (notes: Note[]) => set(() => ({ notes }) )
            })
        ),
        {
            name: "note-store"
        }
    )
)
