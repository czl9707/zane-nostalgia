"use client"

import * as React from 'react';
import { styled } from "@pigment-css/react";

import { MenuContext } from './navigation-menu-context-provider';


const NavigationThreadContainer = styled("div")(({ theme }) => ({
    height: "100%",
    padding: `${theme.padding.thread} 0 ${theme.padding.thread} ${theme.padding.thread}`,
    boxSizing: "border-box", width: theme.breakpoints.sm, overflowY: "scroll",
    flexShrink: "0",

    display: "flex", flexDirection: "column", flexWrap: "nowrap",
    transition: `all ${theme.transition.short} linear`,

    [`@media(max-width: ${theme.breakpoints.md})`]: {
        marginLeft: `max(-100%, -${theme.breakpoints.sm})`,
        width: "100%", maxWidth: theme.breakpoints.sm,
        "&.menu-open": {
            marginRight: `calc(100% - min(100%, ${theme.breakpoints.sm}))`,
            padding: theme.padding.thread, marginLeft: 0,
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
