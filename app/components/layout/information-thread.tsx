"use client"

import * as React from 'react';
import { styled } from "@pigment-css/react";
import { usePathname } from 'next/navigation';

import { MenuContext } from './header-bar-with-context-provider';


const InformationThreadContainer = styled("div")(({ theme }) => ({
    height: "100%",
    padding: `var(--header-height) ${theme.padding.thread} ${theme.padding.thread} ${theme.padding.thread}`,
    boxSizing: "border-box", flexShrink: "0",
    gap: theme.padding.thread,

    display: "flex", flexDirection: "column",
    flexWrap: "nowrap", overflowY: "scroll",
    transition: `all ${theme.transition.long} linear`,

    [`@media(min-width: ${theme.breakpoints.lg})`]: {
        paddingLeft: 0,
        width: `min(${theme.breakpoints.md}, calc(100% - ${theme.breakpoints.sm}))`,
        "&.is-home": {
            width: "100%",
            paddingLeft: theme.padding.thread,
            "&.menu-open": {
                width: `calc(100% - ${theme.breakpoints.sm})`,
                paddingLeft: 0,
            }
        },
    },
    [`@media(max-width: ${theme.breakpoints.lg})`]: {
        width: `100%`,
    },
}));


function InformationThread({ children }: { children: React.ReactNode }) {
    const currentPath = usePathname();
    const isMenuOpen = React.useContext(MenuContext);

    const classes = []
    if (isMenuOpen) classes.push("menu-open");
    if (currentPath == "/") classes.push("is-home");
    return (
        <InformationThreadContainer className={classes.join(" ")}>
            {children}
        </InformationThreadContainer >
    )
}


export default InformationThread;
