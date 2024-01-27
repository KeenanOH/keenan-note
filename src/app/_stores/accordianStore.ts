import { create } from "zustand"
import { persist, combine } from "zustand/middleware"

type InitialState = { open: string[] }
type SetState = { update: (id: string) => void, add: (id: string) => void }

export const useAccordionStore = create(
    persist(
        combine<InitialState, SetState>(
            { open: [] },
            set => ({
                update: id => set(state => {
                    const index = state.open.indexOf(id)

                    if (index == -1)
                        return { open: state.open.concat(id) }

                    return { open: state.open.filter(accordionId => accordionId != id) }
                }),
                add: id => set(state => {
                    if (!state.open.includes(id))
                        return { open: state.open.concat(id) }
                    return state
                })
            })
        ),
        {
            name: "accordion-store"
        }
    )
)
