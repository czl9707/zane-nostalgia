"use client"

import * as React from 'react';
import { styled } from "@pigment-css/react";
import { usePathname } from 'next/navigation';


const InformationThreadContainer = styled("div")(({ theme }) => ({
    height: "100%",
    padding: `var(--header-height) ${theme.padding.thread} ${theme.padding.thread} ${theme.padding.thread}`,
    gap: theme.padding.thread, boxSizing: "border-box",
    flexShrink: "0",
    display: "flex", flexDirection: "column",
    flexWrap: "nowrap", overflowY: "scroll",
    transition: `all ${theme.transition.short} linear`,

    [`@media(min-width: ${theme.breakpoints.lg})`]: {
        width: `calc(100% - ${theme.breakpoints.sm})`,
        paddingLeft: `max(calc(100% - ${theme.breakpoints.sm} - ${theme.breakpoints.md}), ${theme.padding.thread})`,
        "&.is-home": {
            paddingLeft: theme.padding.thread,
        },
    },
    [`@media(max-width: ${theme.breakpoints.lg})`]: {
        width: `100%`,
    },
}));


function InformationThread({ children }: { children: React.ReactNode }) {
    const currentPath = usePathname();
    return (
        <InformationThreadContainer className={currentPath == '/' ? "is-home" : undefined}>
            {children}
        </InformationThreadContainer >
    )
}


export default InformationThread;
