'use client'

import * as React from 'react';
import { css, styled } from "@pigment-css/react";
import { useRouter } from "next/navigation";

import Panel from "../basics/panel";
import { Accordin, AccordinButton } from "../basics/accordin";
import { H4Typography } from "../basics/typography";
import { Orbit } from "../icons/icons";

type NavigationInfo = {
    Icon: React.ElementType;
    name: string;
    route: string;
}[]

const FixedNavigationPanelContainer = styled(Panel)(({ theme }) => ({
    margin: theme.padding.thread, padding: 0,
    width: `calc(${theme.breakpoints.sm} - 2 * ${theme.padding.thread})`,
    boxSizing: "border-box",
    position: "fixed", top: 0, left: 0,

    opacity: "0", transition: `opacity 2s ease 3s,
                                width 2s ease`,
    "&:hover": {
        transition: `opacity ${theme.transition.short} ease,
                    width 2s ease`,
        opacity: 1,
    },

    [`@media(max-width: ${theme.breakpoints.lg})`]: {
        display: "none",
    },
}));

const ThreadNavigationPanelContainer = styled(Panel)(({ theme }) => ({
    opacity: 1, maxHeight: "100vh", padding: 0,
    transition: `opacity ${theme.transition.short} ease ${theme.transition.long},
                margin-bottom ${theme.transition.short} ease ,
                max-height ${theme.transition.long} ease`,

    "&.noshow": {
        marginBottom: `-${theme.padding.thread}`, // workaround the gap in thread
        opacity: 0, maxHeight: 0, pointerEvents: "none",
        transition: `opacity ${theme.transition.short} ease,
                    margin-bottom ${theme.transition.short} ease ${theme.transition.long},
                    max-height ${theme.transition.long} ease ${theme.transition.short}`,
    },
    [`@media(min-width: ${theme.breakpoints.lg})`]: {
        marginBottom: `-${theme.padding.thread}`, // workaround the gap in thread
        opacity: 0, maxHeight: 0, pointerEvents: "none",
        transition: `opacity ${theme.transition.short} ease,
                    margin-bottom ${theme.transition.short} ease ${theme.transition.long},
                    max-height ${theme.transition.long} ease ${theme.transition.short}`,
    },
}));

const opacity1cls = css({ opacity: 1 });

const playgroundContents = [
    {
        icon: <Orbit />,
        name: "Galaxy",
        route: "galaxy"
    }
]


function PanelContent({ sceneNavInfo }: { sceneNavInfo: NavigationInfo }) {
    const router = useRouter();
    return (
        <Accordin defaultOpen buttonContent={
            <H4Typography
                style={{ cursor: "pointer", padding: '.5rem', userSelect: "none", }}>
                NOSTALGIA .Z
            </H4Typography>
        }>
            <AccordinButton text={"Home"} onClick={() => router.push("/")} />
            <Accordin buttonContent={"Scenes"}>
                {
                    sceneNavInfo.map(({ Icon, name, route }) => (
                        <AccordinButton text={name} icon={<Icon />} key={name}
                            onClick={() => router.push(`/scenes/${route}`)} />
                    ))
                }
            </Accordin>
            <Accordin buttonContent={"Playground"}>
                {
                    playgroundContents.map(({ icon, name, route }) => (
                        <AccordinButton text={name} icon={icon} key={name}
                            onClick={() => router.push(`/playground/${route}`)} />
                    ))
                }
            </Accordin>
        </Accordin>
    )
}

function FixedNavigationPanel({ sceneNavInfo }: { sceneNavInfo: NavigationInfo }) {
    const containerOnset = React.useCallback((node: HTMLElement | null) => {
        node?.classList.remove(opacity1cls)
    }, []);

    return (
        <FixedNavigationPanelContainer className={opacity1cls} ref={containerOnset}>
            <PanelContent sceneNavInfo={sceneNavInfo} />
        </FixedNavigationPanelContainer>
    )
}

function ThreadNavigationPanel({ isShow, sceneNavInfo }: { isShow: boolean, sceneNavInfo: NavigationInfo }) {
    return (
        <ThreadNavigationPanelContainer className={isShow ? undefined : "noshow"}>
            <PanelContent sceneNavInfo={sceneNavInfo} />
        </ThreadNavigationPanelContainer>
    )
}

export { FixedNavigationPanel, ThreadNavigationPanel };
export type { NavigationInfo }