"use client"

import * as React from 'react';
import { styled } from "@pigment-css/react";

import { MenuContext } from './navigation-menu-context-provider';


const InformationThreadContainer = styled("div")(({ theme }) => ({
    padding: theme.padding.thread, gap: theme.padding.thread,
    boxSizing: "border-box", width: "100%", flex: "1 1",
    overflowY: "scroll",
    display: "inline-flex", flexDirection: "column", flexWrap: "nowrap",

    transform: "none",
    transition: `all ${theme.transition.short} linear`,

    [`@media(max-width: ${theme.breakpoints.md})`]: {
        "&.menu-open": {
            transform: "translateX(100%)",
            padding: `${theme.padding.thread} 0`
        }
    },
}));


function InformationThread({ children }: { children: React.ReactNode }) {
    const isMenuOpen = React.useContext(MenuContext);

    return (
        <InformationThreadContainer className={isMenuOpen ? "menu-open" : undefined}>
            {children}
        </InformationThreadContainer >
    )
}


export default InformationThread;
