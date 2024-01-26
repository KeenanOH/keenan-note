
export interface Note {
    id: string
    name: string
    public: boolean
    sectionId: string | null
    position: number
}

export interface Section {
    id: string,
    name: string,
    position: number
}
