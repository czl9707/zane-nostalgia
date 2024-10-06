'use client'

import { css, styled } from "@pigment-css/react";
import { useRouter } from "next/navigation";

import Panel from "./ui-components/Panel";
import { Accordin, AccordinButton } from "./ui-components/Accordin";
import { H4Typography } from "./ui-components/Typography";
import React from "react";
import { Orbit } from "./ui-components/Icons";


const NavigationPanelContainer = styled(Panel)(({ theme }) => ({
    position: "fixed", top: 0, left: 0,
    width: "20rem", maxWidth: "calc(100% - 8rem)",
    margin: "4rem", boxSizing: "border-box",

    opacity: "0",
    transition: "all 2s ease 3s",

    "&:hover": {
        transitionDuration: theme.transition.short, transitionDelay: "0s",
        opacity: 1,
    },
}));

const opacity1 = css({ opacity: 1 });

const playgroundContents = [
    {
        icon: <Orbit />,
        name: "Galaxy",
    }
]

function NavigationPanel() {
    const router = useRouter();

    const containerOnset = React.useCallback((node: HTMLElement | null) => {
        node?.classList.remove(opacity1);
    }, []);

    return (
        <NavigationPanelContainer className={opacity1} ref={containerOnset}>
            <Accordin buttonContent={
                <H4Typography
                    style={{ cursor: "pointer", padding: '.5rem' }}>
                    NOSTALGIA .Z
                </H4Typography>
            }>
                <AccordinButton text={"Home"} onClick={() => router.push("/")} />
                <Accordin buttonContent={"Scenes"}></Accordin>
                <Accordin buttonContent={"Playground"}>
                    {
                        playgroundContents.map(({ icon, name }) => (
                            <AccordinButton text={name} icon={icon} key={name}
                                onClick={() => router.push(`/playground/${name.toLowerCase()}`)} />
                        ))
                    }
                </Accordin>
            </Accordin>
        </NavigationPanelContainer>
    )
}



export default NavigationPanel;