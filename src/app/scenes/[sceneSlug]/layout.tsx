"use client"

import * as React from 'react'
import { styled } from '@pigment-css/react';
import { useSearchParams } from 'next/navigation';

import Panel from '@/components/ui/panel';
import { defaultSceneCommonMetaData } from '@/scene-components/utils/constants';
import { FullScreenContext, MenuContext } from '@/components/layout/header-bar-with-context-provider';

const SVGContainerDiv = styled('div')(({ theme }) => ({
    position: "fixed", left: 0, top: 0, bottom: 0,
    boxSizing: "border-box", display: "flex",
    justifyContent: "center", alignItems: "center",

    padding: "2%",
    "&[data-fullscreen=true]": {
        padding: 0,
    },

    [`@media(max-width: ${theme.breakpoint.lg})`]: {
        right: 0,
    },
    [`@media(min-width: ${theme.breakpoint.lg})`]: {
        right: theme.breakpoint.md,
        "&[data-fullscreen=true]": {
            right: 0,
        },
    },

    transition: `all ${theme.transition.short} ease-in`,
}))

const SVGWrapper = styled('svg')(({ theme }) => ({
    maxWidth: "100%", maxHeight: "100%",
    minWidth: 0, minHeight: 0,

    "&[data-fullscreen=true]": {
        maxWidth: "1000%", maxHeight: "1000%",
        minWidth: "100%", minHeight: "100%",
    },
    transition: `all ${theme.transition.short} ease-in`,
}))

// wrapped in Suspense
function SceneHelper({ children }: {
    children: React.ReactNode,
}) {
    const searchParams = useSearchParams();
    const width = parseInt(
        searchParams.get("width") ?? defaultSceneCommonMetaData.width.default.toString());
    const height = parseInt(
        searchParams.get("height") ?? defaultSceneCommonMetaData.height.default.toString());

    const isFullScreen = React.useContext(FullScreenContext);
    const { isMenuOpen, setMenuOpen } = React.useContext(MenuContext);
    React.useEffect(() => {
        const lgWidth = getComputedStyle(document.body).getPropertyValue('--breakpoint-lg');
        const isWideScreen = window.matchMedia(`(min-width: ${lgWidth})`);
        if (!isMenuOpen && isWideScreen.matches) setMenuOpen(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <SVGContainerDiv data-fullscreen={isFullScreen}>
            <SVGWrapper style={{
                maxWidth: isFullScreen ? "300%" : "100%",
                maxHeight: isFullScreen ? "300%" : "100%",
                minWidth: isFullScreen ? "100%" : "0",
                minHeight: isFullScreen ? "100%" : "0",
            }}
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio={"xMidYMid slice"}>
                {children}
            </SVGWrapper>
        </SVGContainerDiv>
    )
}

export default function SceneLayout({ children }: {
    children: React.ReactNode,
}) {
    return (
        <>
            <Panel style={{ position: "fixed", inset: 0 }} />
            <React.Suspense >
                <SceneHelper>
                    {children}
                </SceneHelper>
            </React.Suspense >
        </>
    )
}



export const dynamicParams = false;
export const dynamic = 'force-static';