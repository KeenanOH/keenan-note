import React from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function MarkdownEditor({ content, editing, onChange }: { content: string, editing: boolean, onChange: (newContent: string) => void }) {
    if (editing)
        return (
            <div className="p-8">
                <textarea
                    className="w-full h-screen resize-none outline-none"
                    defaultValue={ content }
                    onChange={ (e) => onChange(e.target.value) }
                />
            </div>
        )

    return (
        <div className="p-8 prose">
            <Markdown remarkPlugins={ [remarkGfm] }>
                { content }
            </Markdown>
        </div>
    )
}
