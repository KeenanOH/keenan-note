import { create } from "zustand"
import { persist, combine } from "zustand/middleware"

type InitialState = { accordions: { id: string, value: string }[] }
type SetState = { toggle: (id: string) => void, get: (id: string) => string }

export const useAccordionStore = create(
    persist(
        combine<InitialState, SetState>(
            { accordions: [] },
            (set, get) => ({
                toggle: id => set(state => {
                    if (!state.accordions.find(accordion => accordion.id === id))
                        state.accordions.push({ id, value: "" })

                    return {
                        accordions: state.accordions.map(accordion => {
                            if (accordion.id != id) return accordion
                            const newValue = accordion.value === accordion.id ? "" : accordion.id
                            return {id: accordion.id, value: newValue}
                        })
                    }
                }),
                get: id => {
                    return get().accordions.find(accordion => accordion.id === id)?.value ?? ""
                }
            })
        ),
        {
            name: "accordion-store"
        }
    )
)
