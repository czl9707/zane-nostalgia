import * as React from 'react'

import { DEFAULT_SVG_HEIGHT, DEFAULT_SVG_WIDTH } from './constants'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <svg viewBox={`0 0 ${DEFAULT_SVG_WIDTH} ${DEFAULT_SVG_HEIGHT}`} height="100%" width="100%" preserveAspectRatio="xMidYMid slice">
            {children}
        </svg>
    )
}