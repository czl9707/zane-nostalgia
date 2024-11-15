"use client"

import * as React from 'react';
import { styled } from "@pigment-css/react";
import { usePathname } from 'next/navigation';

import { MenuContext } from './header-bar-with-context-provider';


const InformationThreadContainer = styled("div")(({ theme }) => ({
    boxSizing: "content-box", height: "100%",
    padding: `var(--header-height) ${theme.padding.thread} ${theme.padding.thread} ${theme.padding.thread}`,
    gap: theme.padding.thread,

    display: "inline-flex", flexDirection: "column",
    flexWrap: "nowrap", overflowY: "visible", overflowX: "visible",
    transition: `all ${theme.transition.short} linear`,

    [`@media(min-width: ${theme.breakpoints.lg})`]: {
        paddingLeft: `calc(100% - ${theme.breakpoints.md} + ${theme.padding.thread})`,
        width: `calc(${theme.breakpoints.md} - 2 * ${theme.padding.thread})`,
        "&.is-home": {
            width: `calc(100% - 2 * ${theme.padding.thread})`,
            paddingLeft: theme.padding.thread,
            "&.menu-open": {
                width: `calc(100% - ${theme.padding.thread} - ${theme.breakpoints.sm})`,
                paddingLeft: theme.breakpoints.sm,
            }
        },
    },
    [`@media(max-width: ${theme.breakpoints.lg})`]: {
        width: `calc(100% - 2 * ${theme.padding.thread})`,
        "&.menu-open": {
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


