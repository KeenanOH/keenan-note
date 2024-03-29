import React from "react"
import RMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeKatex from "rehype-katex"
import remarkMath from "remark-math"
import "katex/dist/katex.min.css"
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import remarkBreaks from "remark-breaks"

export default function Markdown({ children }: { children: string }) {
    return (
        <RMarkdown
            className="prose p-8"
            remarkPlugins={ [remarkGfm, remarkMath, remarkBreaks] }
            rehypePlugins={ [rehypeKatex] }
            components={ {
                code: ({ children, className }) => {
                    const match = /language-(\w+)/.exec(className || "")

                    return match ? (
                        <SyntaxHighlighter
                            PreTag="div"
                            language={match[1]}
                            style={ oneDark }
                        >
                            { String(children).replace(/\n$/, "") }
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className}>
                            {children}
                        </code>
                    )
                }
            } }
        >
            { children }
        </RMarkdown>
    )
}
