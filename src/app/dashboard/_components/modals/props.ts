import { Note } from "@/app/dashboard/_components/sidebar/types"

export interface ModalProps {
    open: boolean
    onOpenChange: (bool: boolean) => void
}

export interface NoteModalProps extends ModalProps {
    note: Note
}
