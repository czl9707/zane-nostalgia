import * as React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ zIndex: -1, width: "100%", height: "100%", position: "fixed" }}>
            {children}
        </div>
    )
}