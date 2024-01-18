import React from "react"
import { Inter } from "next/font/google"

import "./globals.css"
import { Provider } from "@/app/provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Keenan Note",
    description: "A markdown notes app."
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={ inter.className }>
                <main>
                    <Provider>
                        { children }
                    </Provider>
                    <Toaster />
                </main>
            </body>
        </html>
    )
}
