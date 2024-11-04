"use client"

import { css, styled } from "@pigment-css/react";
import Link from 'next/link';
import * as React from 'react';

import { DoubleArrow, Github } from '../ui/icons/icons';
import FlippingIcon from "../ui/icons/flipping-icon";


interface HeaderBarProps {
    toggleMenu: () => void,
    isMenuOpen: boolean,
}

const HeaderBarDiv = styled("div")(({ theme }) => ({
    padding: `0 ${theme.padding.thread}`, zIndex: 1000,
    height: "var(--header-height)", top: "0", left: 0, right: 0,
    position: "fixed", backgroundColor: "transparent",
    display: "flex", flexDirection: "row", alignItems: "center",
    gap: "1rem",
}));


function HeaderBar({ toggleMenu, isMenuOpen }: HeaderBarProps) {
    return (
        <HeaderBarDiv>
            <FlippingIcon direction="horizontal"
                className={css(
                    ({ theme }) => ({
                        [`@media(min-width: ${theme.breakpoints.lg})`]: { display: "none" }
                    })
                )}
                onClick={toggleMenu}
                isFlipped={!isMenuOpen}
                before={<DoubleArrow />}
            />
            <div style={{ flex: "1 1" }} />
            <Link href={"https://github.com/czl9707/zane-nostalgia"} target="_blank" rel="noopener noreferrer">
                <Github />
            </Link>
        </HeaderBarDiv>
    )
}

export default HeaderBar;