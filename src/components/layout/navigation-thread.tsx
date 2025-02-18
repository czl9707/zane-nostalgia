"use client"

import * as React from 'react';
import { styled } from "@pigment-css/react";

import { MenuContext } from './header-bar-with-context-provider';
import { usePathname } from 'next/navigation';


const NavigationThreadContainer = styled("div")(({ theme }) => ({
    position: "fixed", top: 0,
    height: "100%", boxSizing: "border-box", overflowY: "scroll",
    padding: `${theme.size.header.height} 0 ${theme.padding.thread} ${theme.padding.thread}`,

    display: "inline-flex", flexDirection: "column", flexWrap: "nowrap",
    transition: `all ${theme.transition.short} linear`,

    [`@media(min-width: ${theme.breakpoint.lg})`]: {
        width: theme.breakpoint.sm,
        left: `-${theme.breakpoint.sm}`,
        "&[data-menu-open=true]": {
            left: 0,
        },
    },

    [`@media(max-width: ${theme.breakpoint.lg})`]: {
        left: `max(-100%, -${theme.breakpoint.sm})`,
        width: `min(100%, ${theme.breakpoint.sm})`,
        "&[data-menu-open=true]": {
            left: 0, paddingRight: theme.padding.thread,
        }
    },

    "&::-webkit-scrollbar": {
        display: "none",
    },
}));


export default function NavigationThread({ children }: { children: React.ReactNode }) {
    const currentPath = usePathname();
    const { isMenuOpen } = React.useContext(MenuContext);

    return (
        <NavigationThreadContainer data-menu-open={isMenuOpen} data-is-home={currentPath == "/"}>
            {children}
        </NavigationThreadContainer>
    )
}
