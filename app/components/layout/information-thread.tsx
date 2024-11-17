"use client"

import * as React from 'react';
import { styled } from "@pigment-css/react";
import { usePathname } from 'next/navigation';

import { MenuContext } from './header-bar-with-context-provider';


const InformationThreadContainer = styled("div")(({ theme }) => ({
    boxSizing: "border-box",
    padding: `${theme.size.header.height} ${theme.padding.thread} ${theme.padding.thread} ${theme.padding.thread}`,
    gap: theme.size.header.height,

    display: "inline-flex", flexDirection: "column",
    flexWrap: "nowrap", overflowY: "visible", overflowX: "visible",
    transition: `all ${theme.transition.short} linear`,

    [`@media(min-width: ${theme.breakpoints.lg})`]: {
        width: `100%`,
        paddingLeft: `calc(100% - ${theme.breakpoints.md})`,
        "&.is-home": {
            width: `100%`,
            paddingLeft: theme.padding.thread,
            "&.menu-open": {
                width: `100%`,
                paddingLeft: `calc(${theme.padding.thread} + ${theme.breakpoints.sm})`,
            }
        },
    },
    [`@media(max-width: ${theme.breakpoints.lg})`]: {
        width: `100%`,
        "&.menu-open": {
            width: `200%`,
            paddingLeft: `100%`,
        },
    },
}));


export default function InformationThread({ children }: { children: React.ReactNode }) {
    const currentPath = usePathname();
    const { isMenuOpen } = React.useContext(MenuContext);

    const classes = []
    if (isMenuOpen) classes.push("menu-open");
    if (currentPath == "/") classes.push("is-home");
    return (
        <InformationThreadContainer className={classes.join(" ")}>
            {children}
        </InformationThreadContainer >
    )
}


