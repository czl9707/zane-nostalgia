'use client'

import * as React from 'react';
import { css, styled } from "@pigment-css/react";
import { useRouter } from "next/navigation";

import Panel from "./ui-components/Panel";
import { Accordin, AccordinButton } from "./ui-components/Accordin";
import { H4Typography } from "./ui-components/Typography";
import { Orbit } from "./ui-components/Icons/Icons";


const NavigationPanelContainer = styled(Panel)(({ theme }) => ({
    margin: "4rem", boxSizing: "border-box",

    // lg -> stick to left
    // md <-> lg hidden by default stick to right
    // <- md hidden by default take full screen
    [`@media(min-width: ${theme.breakpoints.lg})`]: {
        position: "fixed", top: 0, left: 0,
        width: `calc(${theme.breakpoints.sm} - 8rem)`,

        opacity: "0", transition: `opacity 2s ease 3s,
                                    width 2s ease`,
        "&:hover": {
            transition: `opacity ${theme.transition.short} ease,
                        width 2s ease`,
            opacity: 1,
        },
    },
    [`@media(max-width: ${theme.breakpoints.lg})`]: {
        transition: `max-height ${theme.transition.short} ease,
                    opacity ${theme.transition.short} ease ${theme.transition.short},
                    margin ${theme.transition.short} ease`,
        position: "relative", float: "right", opacity: 1,
        margin: "4rem 4rem 0 4rem", maxHeight: "100vh",
        "&.noshow": {
            transition: `max-height ${theme.transition.short} ease ${theme.transition.short},
                        opacity ${theme.transition.short} ease,
                        margin ${theme.transition.short} ease ${theme.transition.short}`,
            overflowY: "hidden", opacity: 0,
            margin: "0 4rem 0 4rem", maxHeight: 0
        }
    },
    [`@media(min-width: ${theme.breakpoints.md}) and (max-width: ${theme.breakpoints.lg})`]: {
        width: `calc(${theme.breakpoints.md} - 8rem)`,
    },
    [`@media(max-width: ${theme.breakpoints.md})`]: {
        width: "calc(100% - 8rem)",
    },

}));

const opacity1 = css({ opacity: 1 });

const playgroundContents = [
    {
        icon: <Orbit />,
        name: "Galaxy",
    }
]

interface NavigationPanelProps {
    isShow: boolean,
    onClose: () => void,
}

function NavigationPanel({ isShow, onClose }: NavigationPanelProps) {
    const router = useRouter();
    const [firstLoad, setFirstLoad] = React.useState<boolean>(true);

    const containerOnset = React.useCallback(() => {
        setFirstLoad(false)
    }, []);

    const classes = [];
    if (firstLoad) classes.push(opacity1);
    if (!isShow) classes.push("noshow");

    return (
        <NavigationPanelContainer className={classes.join(" ")} ref={containerOnset}>
            <Accordin defaultOpen buttonContent={
                <H4Typography
                    style={{ cursor: "pointer", padding: '.5rem' }}>
                    NOSTALGIA .Z
                </H4Typography>
            }>
                <AccordinButton text={"Home"} onClick={() => {
                    onClose();
                    router.push("/");
                }} />
                <Accordin buttonContent={"Scenes"}></Accordin>
                <Accordin buttonContent={"Playground"}>
                    {
                        playgroundContents.map(({ icon, name }) => (
                            <AccordinButton text={name} icon={icon} key={name}
                                onClick={() => {
                                    onClose();
                                    router.push(`/playground/${name.toLowerCase()}`);
                                }} />
                        ))
                    }
                </Accordin>
            </Accordin>
        </NavigationPanelContainer>
    )
}


export default NavigationPanel;