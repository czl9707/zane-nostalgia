'use client'

import * as React from 'react';
import { css, styled } from "@pigment-css/react";
import { useRouter } from "next/navigation";

import Panel from "../ui-components/Panel";
import { Accordin, AccordinButton } from "../ui-components/Accordin";
import { H4Typography } from "../ui-components/Typography";
import { Orbit } from "../ui-components/Icons/Icons";


const FixedNavigationPanelContainer = styled(Panel)(({ theme }) => ({
    margin: "4rem", boxSizing: "border-box",
    position: "fixed", top: 0, left: 0,
    width: `calc(${theme.breakpoints.sm} - 8rem)`,

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
    opacity: 1, marginBottom: "4rem", maxHeight: "100vh",
    transition: `opacity ${theme.transition.short} ease ${theme.transition.long},
                margin-bottom ${theme.transition.short} ease ,
                max-height ${theme.transition.long} ease`,

    "&.noshow": {
        marginBottom: 0, opacity: 0, maxHeight: 0,
        transition: `opacity ${theme.transition.short} ease,
                    margin-bottom ${theme.transition.short} ease ${theme.transition.long},
                    max-height ${theme.transition.long} ease ${theme.transition.short}`,
    },
    [`@media(min-width: ${theme.breakpoints.lg})`]: {
        marginBottom: 0, opacity: 0, maxHeight: 0,
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
    }
]

function PanelContent({ onNavigate }: { onNavigate?: () => void }) {
    const router = useRouter();
    return (
        <Accordin defaultOpen buttonContent={
            <H4Typography
                style={{ cursor: "pointer", padding: '.5rem' }}>
                NOSTALGIA .Z
            </H4Typography>
        }>
            <AccordinButton text={"Home"} onClick={() => {
                if (onNavigate) onNavigate();
                router.push("/");
            }} />
            <Accordin buttonContent={"Scenes"}></Accordin>
            <Accordin buttonContent={"Playground"}>
                {
                    playgroundContents.map(({ icon, name }) => (
                        <AccordinButton text={name} icon={icon} key={name}
                            onClick={() => {
                                if (onNavigate) onNavigate();
                                router.push(`/playground/${name.toLowerCase()}`);
                            }} />
                    ))
                }
            </Accordin>
        </Accordin>
    )
}

function FixedNavigationPanel() {
    const containerOnset = React.useCallback((node: HTMLElement | null) => {
        node?.classList.remove(opacity1cls)
    }, []);

    return (
        <FixedNavigationPanelContainer className={opacity1cls} ref={containerOnset}>
            <PanelContent />
        </FixedNavigationPanelContainer>
    )
}

function ThreadNavigationPanel({ onNavigate, isShow }: { onNavigate?: () => void, isShow: boolean }) {
    return (
        <ThreadNavigationPanelContainer className={isShow ? undefined : "noshow"}>
            <PanelContent onNavigate={onNavigate} />
        </ThreadNavigationPanelContainer>
    )
}

export { FixedNavigationPanel, ThreadNavigationPanel };