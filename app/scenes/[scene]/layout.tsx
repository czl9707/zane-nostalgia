import * as React from 'react'

import { defaultSceneSizeMetaData } from '@/app/scene-components/utils/constants'

const DEFAULT_SVG_HEIGHT = defaultSceneSizeMetaData.height.default;
const DEFAULT_SVG_WIDTH = defaultSceneSizeMetaData.width.default;


export default function SceneLayout({
    children
}: {
    children: React.ReactNode,
}) {
    return (
        <svg viewBox={`0 0 ${DEFAULT_SVG_WIDTH} ${DEFAULT_SVG_HEIGHT}`} height="100%" width="100%" preserveAspectRatio="xMidYMid slice">
            {children}
        </svg>
    )
}