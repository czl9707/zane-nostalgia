"use client"

import * as React from 'react';
import { styled } from "@pigment-css/react";

import { MenuContext } from './header-bar-with-context-provider';
import { usePathname } from 'next/navigation';


const NavigationThreadContainer = styled("div")(({ theme }) => ({
    position: "fixed", top: 0,
    height: "100%", boxSizing: "border-box", overflowY: "scroll",
    padding: `${theme.size.header.height} 0 ${theme.padding.thread} ${theme.padding.thread}`,

    display: "flex", flexDirection: "column", flexWrap: "nowrap",
    transition: `all ${theme.transition.short} linear`,

    [`@media(min-width: ${theme.breakpoints.lg})`]: {
        width: theme.breakpoints.sm,
        left: `-${theme.breakpoints.sm}`,
        "&.menu-open": {
            left: 0,
        },
    },

    [`@media(max-width: ${theme.breakpoints.lg})`]: {
        left: `max(-100%, -${theme.breakpoints.sm})`,
        width: `min(100%, ${theme.breakpoints.sm})`,
        "&.menu-open": {
            left: 0,
        }
    },

    "::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
    },
}));


export default function NavigationThread({ children }: { children: React.ReactNode }) {
    const currentPath = usePathname();
    const { isMenuOpen } = React.useContext(MenuContext);

    const classes = []
    if (isMenuOpen) classes.push("menu-open");
    if (currentPath == "/") classes.push("is-home");

    return (
        <NavigationThreadContainer className={classes.join(" ")}>
            {children}
        </NavigationThreadContainer>
    )
}
