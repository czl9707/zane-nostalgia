"use client"

import { styled } from "@pigment-css/react";
import Link from 'next/link';
import * as React from 'react';

import { DoubleArrow, FitScreen, FloatLandscape2, Github } from '../ui/icons/icons';
import FlippingIcon from "../ui/icons/flipping-icon";
import { usePathname } from "next/navigation";


interface HeaderBarProps {
    toggleMenu: () => void,
    isMenuOpen: boolean,
    toggleFullScreen: () => void,
    isFullScreen: boolean,
}

const HeaderBarDiv = styled("div")(({ theme }) => ({
    padding: `0 ${theme.padding.thread}`, zIndex: 1000,
    height: theme.size.header.height, top: "0", left: 0, right: 0,
    position: "fixed", backgroundColor: "transparent",
    display: "flex", flexDirection: "row", alignItems: "center",
    gap: "1rem",
    color: theme.vars.colors.primary.contrastText,
}));


function HeaderBar({ toggleMenu, isMenuOpen, toggleFullScreen, isFullScreen }: HeaderBarProps) {
    const currentPath = usePathname();

    return (
        <HeaderBarDiv>
            <FlippingIcon direction="horizontal"
                onClick={toggleMenu}
                isFlipped={!isMenuOpen}
                before={<DoubleArrow />}
            />
            <div style={{ flex: "1 1" }} />
            <FlippingIcon direction="horizontal"
                style={{ display: currentPath.startsWith("/scenes/") ? undefined : "none" }}
                onClick={toggleFullScreen}
                isFlipped={!isFullScreen}
                before={<FloatLandscape2 />}
                after={<FitScreen />}
            />
            <Link href={"https://github.com/czl9707/zane-nostalgia"} target="_blank" rel="noopener noreferrer">
                <Github />
            </Link>
        </HeaderBarDiv>
    )
}

export default HeaderBar;