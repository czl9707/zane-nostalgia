"use client"

import dynamic from "next/dynamic"
import * as ReactDOM from 'react-dom'
import * as React from 'react'

const SceneComponents = {
    "404": dynamic(async () => import(`../../scene-components/404`).then(m => m.Component)),
    "meteors": dynamic(async () => import(`../../scene-components/meteors`).then(m => m.Component)),
    "waves": dynamic(async () => import(`../../scene-components/waves`).then(m => m.Component)),
    "rainy": dynamic(async () => import(`../../scene-components/rainy`).then(m => m.Component)),
} as const;

type ShowCaseSceneTypes = keyof typeof SceneComponents;

export default function ShowcasePanelShadowWrapper({ scene, ...other }: { scene: ShowCaseSceneTypes }) {
    const SceneComponent: React.ComponentType<Record<string, string>> = SceneComponents[scene];
    const [shadowRoot, setShadowRoot] = React.useState<ShadowRoot | undefined>();
    const setShadowCallback = React.useCallback<(el: HTMLDivElement) => void>((el) => {
        const sr = el.attachShadow({ mode: "open" });
        setShadowRoot(sr);
    }, [])

    return (
        <div ref={setShadowCallback} >
            {
                shadowRoot && ReactDOM.createPortal(
                    (
                        <svg viewBox={`0 0 1000 1000`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
                            <SceneComponent width={"1000"} height={"1000"} {...other} />
                        </svg>
                    ),
                    shadowRoot
                )
            }
        </div>
    )
}

export type { ShowCaseSceneTypes };