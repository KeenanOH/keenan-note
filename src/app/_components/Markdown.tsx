import React from "react"
import RMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import "katex/dist/katex.min.css"

export default function Markdown({ children }: { children: string }) {
    return (
        <RMarkdown className="prose p-8" remarkPlugins={ [remarkGfm, remarkMath] } rehypePlugins={ [rehypeKatex] }>
            { children }
        </RMarkdown>
    )
}
