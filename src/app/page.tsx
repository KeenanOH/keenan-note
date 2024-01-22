"use client"

import React from "react"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

import LoadingScreen from "@/app/_components/LoadingScreen"

export default function Home() {

    const session = useSession()

    if (session.status === "loading")
        return <LoadingScreen />

    if (session.status === "unauthenticated" || !session.data?.user )
        redirect("/api/auth/signin")

    redirect("/dashboard")
}
