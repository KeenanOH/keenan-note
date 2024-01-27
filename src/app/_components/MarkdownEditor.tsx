import React from "react"

import Markdown from "@/app/_components/Markdown"
import {ScrollArea} from "@/components/ui/scroll-area"

export default function MarkdownEditor({ content, editing, onChange }: { content: string, editing: boolean, onChange: (newContent: string) => void }) {
    if (editing)
        return (
            <textarea
                className="p-8 w-full h-full outline-none resize-none"
                defaultValue={ content }
                onChange={ e => onChange(e.target.value) }
            />
        )

    return (
        <ScrollArea className="h-full">
            <div id="note-display">
                <Markdown>
                    { content }
                </Markdown>
            </div>
        </ScrollArea>
    )
}
