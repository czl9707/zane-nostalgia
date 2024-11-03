"use client"

import * as React from 'react';
import { styled } from "@pigment-css/react";

import { MenuContext } from './navigation-menu-context-provider';


const NavigationThreadContainer = styled("div")(({ theme }) => ({
    padding: `${theme.padding.thread} 0 ${theme.padding.thread} ${theme.padding.thread}`,
    boxSizing: "border-box", width: theme.breakpoints.sm,
    overflowY: "scroll",
    display: "inline-flex", flexDirection: "column", flexWrap: "nowrap",

    transition: `all ${theme.transition.short} linear`,

    [`@media(max-width: ${theme.breakpoints.md})`]: {
        padding: `${theme.padding.thread} 0`, transform: "translateX(-100%)",
        width: 0,
        "&.menu-open": {
            transform: "none",
            width: "100%", padding: theme.padding.thread,
        }
    },
}));


export default function NavigationThread({ children }: { children: React.ReactNode }) {
    const isMenuOpen = React.useContext(MenuContext);

    return (
        <NavigationThreadContainer className={isMenuOpen ? "menu-open" : undefined}>
            {children}
        </NavigationThreadContainer>
    )
}
