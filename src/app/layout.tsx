import React from "react"
import { Inter } from "next/font/google"
import type { Metadata, Viewport } from "next"

import "./globals.css"
import { Provider } from "@/app/provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

const APP_NAME = "Keenan Note";
const APP_DEFAULT_TITLE = "Keenan Note";
const APP_TITLE_TEMPLATE = "Keenan Note";
const APP_DESCRIPTION = "A markdown notes app.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: "#FFFFFF"
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
