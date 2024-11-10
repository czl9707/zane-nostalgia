"use client"

import * as React from 'react'
import { styled } from '@pigment-css/react';
import { useSearchParams } from 'next/navigation';

import Panel from '../../components/ui/panel';
import { defaultSceneSizeMetaData } from '../../scene-components/utils/constants';
import { FullScreenContext } from '../../components/layout/header-bar-with-context-provider';

const SVGContainer = styled('div')(({ theme }) => ({
    position: "fixed", left: 0, top: 0, bottom: 0,
    boxSizing: "border-box", display: "flex",
    justifyContent: "center", alignItems: "center",

    padding: "2%",
    "&.fullscreen": {
        padding: 0,
    },
    [`@media(min-width: ${theme.breakpoints.lg})`]: {
        right: theme.breakpoints.md,
        "&.fullscreen": {
            right: 0,
        },
    },

    transition: `all ${theme.transition.short} linear`,
}))

const SVGWrapper = styled('svg')(({ theme }) => ({
    maxWidth: "100%", maxHeight: "100%",
    minWidth: 0, minHeight: 0,

    "&.fullscreen": {
        maxWidth: "1000%", maxHeight: "1000%",
        minWidth: "100%", minHeight: "100%",
    },
    transition: `all ${theme.transition.short} linear`,
}))

export default function SceneLayout({ children }: {
    children: React.ReactNode,
}) {
    const searchParams = useSearchParams();
    const width = searchParams.get("width") ?? defaultSceneSizeMetaData.width.default;
    const height = searchParams.get("height") ?? defaultSceneSizeMetaData.height.default;

    const isFullScreen = React.useContext(FullScreenContext);

    return (
        <>
            <Panel style={{ position: "fixed", inset: 0 }} />
            <React.Suspense >
                <SVGContainer className={isFullScreen ? "fullscreen" : undefined}>
                    <SVGWrapper className={isFullScreen ? "fullscreen" : undefined}
                        viewBox={`0 0 ${width} ${height}`}
                        preserveAspectRatio={"xMidYMid slice"}>
                        {children}
                    </SVGWrapper>
                </SVGContainer>
            </React.Suspense >
        </>
    )
}


export const dynamicParams = false;
export const dynamic = 'force-static';