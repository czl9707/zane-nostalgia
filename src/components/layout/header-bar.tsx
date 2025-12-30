"use client"

import { styled } from "@pigment-css/react";
import Link from 'next/link';
import * as React from 'react';

import { DoubleArrow, Github } from '@/components/ui/icons/icons';
import FlippingIcon from "@/components/ui/icons/flipping-icon";


interface HeaderBarProps {
    toggleMenu: () => void,
    isMenuOpen: boolean,
}

const HeaderBarDiv = styled("div")(({ theme }) => ({
    padding: `0 ${theme.padding.thread}`, zIndex: 1000,
    height: theme.size.header.height, top: "0", left: 0, right: 0,
    position: "fixed", backgroundImage: `linear-gradient(to bottom, rgb(${theme.vars.colors.primary.background}) 15%, transparent 100%)`,
    display: "flex", flexDirection: "row", alignItems: "center",
    gap: "1rem", boxSizing: "border-box",
    color: `rgb(${theme.vars.colors.primary.contrastText})`,
}));


function HeaderBar({ toggleMenu, isMenuOpen }: HeaderBarProps) {
    return (
        <HeaderBarDiv>
            <FlippingIcon direction="horizontal"
                onClick={toggleMenu}
                isFlipped={!isMenuOpen}
                before={<DoubleArrow />}
            />
            <div style={{ flex: "1 1" }} />
            <Link href={"https://github.com/czl9707/nostalgia-gh-banner"} target="_blank" rel="noopener noreferrer">
                <Github />
            </Link>
        </HeaderBarDiv>
    )
}

export default HeaderBar;