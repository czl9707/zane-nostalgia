'use client'

import { redirect } from "next/navigation"

export default function NotFound() {
    redirect("/scenes/404")
}