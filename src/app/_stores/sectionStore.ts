import { create } from "zustand"
import { persist, combine } from "zustand/middleware"
import { Section } from "@/app/dashboard/_components/sidebar/types"

type InitialState = { sections: Section[] }
type SetState = { update: (id: string, position: number) => void, set: (sections: Section[]) => void }

export const useSectionStore = create(
    persist(
        combine<InitialState, SetState>(
            { sections: [] },
            set => ({
                update: (id, position) => set(state => {
                    return {
                        sections: state.sections.map(section => {
                            if (section.id != id)
                                return section

                            return { ...section, position }
                        })
                    }
                }),
                set: sections => set(() => ({ sections: sections }) )
            })
        ),
        {
            name: "section-store"
        }
    )
)
