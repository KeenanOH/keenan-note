import { Separator } from "@/components/ui/separator"
import {Button} from "@/components/ui/button";
import {CircleEllipsisIcon} from "lucide-react";
import EllipsisIcon from "@/app/_components/EllipsisIcon";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu";
import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {toast} from "sonner";
import {trpc} from "@/utils/trpc";

export default function NoteListCell({ note, onClick }: { note: { id: string, name: string, public: boolean }, onClick: (note: { id: string, name: string, public: boolean }) => void }) {

    const updateNote = trpc.note.updateNote.useMutation()
    const [shareDialogOpen, setShareDialogOpen] = useState(false)

    return (
        <>
            <div className="flex items-center">
                <ContextMenu >
                    <ContextMenuTrigger>
                        <div className="text-sm cursor-pointer" onClick={ () => onClick(note) }>
                            { note.name }
                        </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem
                            onClick={ () => setShareDialogOpen(true) }
                        >
                            Share
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </div>
            <Separator className="my-2" />

            <Dialog open={ shareDialogOpen } onOpenChange={ setShareDialogOpen }>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Share</DialogTitle>
                        <DialogDescription>
                            You will make this note public. Click share to confirm.
                        </DialogDescription>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="link" className="text-right">
                                    Link
                                </Label>
                                <Input id="link" value={ `https://keenan-note.vercel.app/notes/${note.id}` } className="col-span-3" contentEditable={ false } />
                            </div>
                        </div>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            onClick={ () => {
                                const promise = updateNote.mutateAsync({ id: note.id, public: true })
                                toast.promise(promise, {
                                    loading: "Loading...",
                                    success: note => {
                                        setShareDialogOpen(false)
                                        return "Successfully shared note"
                                    },
                                    error: (error: Error) => error.message
                                })
                            } }
                        >
                            Share
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
