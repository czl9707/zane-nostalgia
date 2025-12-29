"use client"

import * as React from "react";
import { styled } from "@pigment-css/react";


import NavigationThreadContent from "./navigation-thread-content";
import { MenuContext } from "./header-bar-with-context-provider";
import { usePathname } from "next/navigation";

const Container = styled("div")(({theme}) => ({
    position: "fixed", inset: 0, lineHeight: 0,
    overflowX: 'hidden', overflowY: "scroll", justifyContent: "space-between", alignItems: "stretch",
    display: "inline-flex", flexDirection: "row", flexWrap: "nowrap",
    padding: `${theme.size.header.height} ${theme.padding.thread} ${theme.padding.thread} ${theme.padding.thread}`,
    transition: `all ${theme.transition.short} ease-in`,

    "&[data-menu-open=true]": {
        left: 0,
        [`@media (max-width: ${theme.breakpoint.lg})`]: {
            right: `calc(-${theme.breakpoint.md} - ${theme.padding.thread})`,
        },
    },
    left: `calc(-${theme.breakpoint.sm} - ${theme.padding.thread})`,

    "&::-webkit-scrollbar": {
        display: "none",
    },
}));

const ThreadSplitter = styled("div")(({ theme }) => ({
    flex: "1 1", minWidth: theme.padding.thread,
}));


const NavigationThreadContainer = styled("div")(({ theme }) => ({
    position: "sticky", top: 0,
    maxWidth: theme.breakpoint.sm, width: "100%",
    boxSizing: "border-box", overflowY: "scroll",

    display: "inline-flex", flexDirection: "column", flexWrap: "nowrap",
    transition: `all ${theme.transition.short} ease-in`,
}));


const InformationThreadContainer = styled("div")(({ theme }) => ({
    boxSizing: "border-box",
    gap: theme.size.header.height,

    display: "inline-flex", flexDirection: "column",
    flexWrap: "nowrap", overflowY: "visible", overflowX: "visible",
    transition: `all ${theme.transition.short} ease-in`,

    maxWidth: theme.breakpoint.md, width: "100%",
    
    "[data-is-home=true] &": {
        maxWidth: "unset",
    },
}));

export default function LayoutOtherThanScene({ children }: { children: React.ReactNode }) {
    const { isMenuOpen } = React.useContext(MenuContext);
    const currentPath = usePathname();

    return (
        <Container data-menu-open={isMenuOpen} data-is-home={currentPath == "/"}>
            <NavigationThreadContainer>
                <NavigationThreadContent />
            </NavigationThreadContainer>
            <ThreadSplitter/>
            <InformationThreadContainer>
                {children}
                <span style={{minHeight:"1px"}}/> 
                {/* Trick for scrolling behavior */}
            </InformationThreadContainer>
        </Container>
    )
}