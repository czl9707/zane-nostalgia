'use client'

import * as React from 'react';
import { styled } from "@pigment-css/react";
import { useRouter } from "next/navigation";

import Panel from "../ui/panel";
import { Accordin, AccordinButton } from "../controls/accordin";
import { H4Typography } from "../ui/typography";
import { Orbit } from "../ui/icons/icons";
import IconHolder from '../ui/icons/icon-holder';

type NavigationInfo = {
    iconStr: string,
    name: string,
    route: string,
}[]

const FixedNavigationPanelContainer = styled(Panel)(({ theme }) => ({
    margin: theme.padding.thread, padding: 0,
    width: `calc(${theme.breakpoints.sm} - 2 * ${theme.padding.thread})`,
    boxSizing: "border-box",
    position: "fixed", top: 0, left: 0,
    transition: `width 2s ease`,

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
                    sceneNavInfo.map(({ iconStr, name, route }) => (
                        <AccordinButton text={name} icon={<IconHolder dangerouslySetInnerHTML={{ __html: iconStr }} />} key={name}
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
    return (
        <FixedNavigationPanelContainer>
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