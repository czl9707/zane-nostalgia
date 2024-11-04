"use client"

import * as React from 'react'
import Panel from '@/app/components/ui/panel';

export default function SceneLayout({ children }: {
    children: React.ReactNode,
}) {
    return (
        <>
            <Panel style={{ position: "fixed", inset: 0 }} />
            <React.Suspense >
                {children}
            </React.Suspense>
        </>
    )
}


export const dynamicParams = false;
export const dynamic = 'force-static';