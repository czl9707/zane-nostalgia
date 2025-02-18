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

    [`@media(min-width: ${theme.breakpoint.lg})`]: {
        width: `100%`,
        paddingLeft: `calc(100% - ${theme.breakpoint.md})`,
        "&[data-is-home=true]": {
            width: `100%`,
            paddingLeft: theme.padding.thread,
            "&[data-menu-open=true]": {
                width: `100%`,
                paddingLeft: `calc(${theme.padding.thread} + ${theme.breakpoint.sm})`,
            }
        },
    },
    [`@media(max-width: ${theme.breakpoint.lg})`]: {
        width: `100%`,
        "&[data-menu-open=true]": {
            width: `200%`,
            paddingLeft: `100%`,
        },
    },
}));


export default function InformationThread({ children }: { children: React.ReactNode }) {
    const currentPath = usePathname();
    const { isMenuOpen } = React.useContext(MenuContext);

    return (
        <InformationThreadContainer data-menu-open={isMenuOpen} data-is-home={currentPath == "/"}>
            {children}
        </InformationThreadContainer >
    )
}


