import React from "react"

export default function Show({ children, bool }: { children: React.ReactNode, bool: boolean }) {
    if (bool)
        return children
}
