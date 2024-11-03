"use client"

import { css, styled } from "@pigment-css/react";
import Link from 'next/link';
import * as React from 'react';

import { Close, Github, Menu } from '../ui/icons/icons';
import FlippingIcon from "../ui/icons/flipping-icon";


interface HeaderBarProps {
    toggleMenu: () => void,
    isMenuOpen: boolean,
}

const HeaderBarDiv = styled("div")({
    padding: "0 4rem", zIndex: 1000,
    height: "4rem", top: "0", left: 0, right: 0,
    position: "fixed", backgroundColor: "transparent",
    display: "flex", flexDirection: "row", alignItems: "center",
    gap: "1rem",
});


function HeaderBar({ toggleMenu, isMenuOpen }: HeaderBarProps) {
    return (
        <HeaderBarDiv>
            <FlippingIcon
                className={css(
                    ({ theme }) => ({
                        [`@media(min-width: ${theme.breakpoints.md})`]: { display: "none" }
                    })
                )}
                onClick={toggleMenu}
                isFlipped={isMenuOpen}
                before={<Menu />}
                after={<Close />}
            />
            <div style={{ flex: "1 1" }} />
            <Link href={"https://github.com/czl9707/zane-nostalgia"} target="_blank" rel="noopener noreferrer">
                <Github />
            </Link>
        </HeaderBarDiv>
    )
}

export default HeaderBar;