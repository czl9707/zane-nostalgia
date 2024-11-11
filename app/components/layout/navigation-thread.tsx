"use client"

import * as React from 'react';
import { styled } from "@pigment-css/react";

import { MenuContext } from './header-bar-with-context-provider';


const NavigationThreadContainer = styled("div")(({ theme }) => ({
    height: "100%",
    padding: `var(--header-height) ${theme.padding.thread} ${theme.padding.thread} ${theme.padding.thread}`,
    boxSizing: "border-box", overflowY: "scroll", flexShrink: "0",

    display: "flex", flexDirection: "column", flexWrap: "nowrap",
    transition: `all ${theme.transition.long} linear`,

    [`@media(min-width: ${theme.breakpoints.lg})`]: {
        width: theme.breakpoints.sm,
        marginLeft: `-${theme.breakpoints.sm}`,
        marginRight: `calc(100% - ${theme.breakpoints.md})`,
        "&.menu-open": {
            marginLeft: 0,
            marginRight: `max(calc(100% - ${theme.breakpoints.sm} - ${theme.breakpoints.md}), 0px)`,
        }
    },

    [`@media(max-width: ${theme.breakpoints.lg})`]: {
        marginLeft: `max(-100%, -${theme.breakpoints.sm})`,
        width: `min(100%, ${theme.breakpoints.sm})`,
        "&.menu-open": {
            marginRight: `max(0px, calc(100% - ${theme.breakpoints.sm}))`,
            marginLeft: 0,
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
