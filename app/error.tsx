'use client'

import { redirect } from "next/navigation"

// this is a work around https://github.com/vercel/next.js/issues/54270
export default function Error() {
    redirect("/scenes/404")
}