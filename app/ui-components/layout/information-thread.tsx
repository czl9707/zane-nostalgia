"use client"

import * as React from 'react';
import { css, styled } from "@pigment-css/react";

import HeaderBar from './header-bar';
import { FixedNavigationPanel, NavigationInfo, ThreadNavigationPanel } from './navigation-panel'
import FlippingIcon from '../icons/flipping-icon';
import { Close, Menu } from '../icons/icons';

const InformationThreadContainer = styled("div")(({ theme }) => ({
    padding: theme.padding.thread,
    gap: theme.padding.thread,
    boxSizing: "border-box",
    position: "fixed", overflowY: "scroll",
    right: 0, top: 0, bottom: 0,

    display: "inline-flex", flexDirection: "column", flexWrap: "nowrap",


    [`@media(min-width: ${theme.breakpoints.md})`]: {
        width: theme.breakpoints.md,
    },
    [`@media(max-width: ${theme.breakpoints.md})`]: {
        width: "100%",
    },

    // Scroll Bar
    "&::-webkit-scrollbar": {
        width: "10px", padding: "0 3px",
    },
    "&::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
        backgroundColor: theme.vars.colors.secondary.background,
        borderRadius: "5px",
    },
    "&::-webkit-scrollbar-button": {
        backgroundColor: "transparent", height: "5px",
    },
}));


function InformationThread({ children, sceneNavInfo }: {
    children: React.ReactNode,
    sceneNavInfo: NavigationInfo
}) {
    const [navIsOpen, setNavIsOpen] = React.useState<boolean>(false);
    const toggleNav = () => setNavIsOpen((isOpen) => !isOpen);

    return (
        <>
            <FixedNavigationPanel sceneNavInfo={sceneNavInfo} />
            <InformationThreadContainer >
                <HeaderBar>
                    <div style={{ flex: "1 1" }} />
                    <FlippingIcon
                        className={css(
                            ({ theme }) => ({
                                [`@media(min-width: ${theme.breakpoints.lg})`]: { display: "none" }
                            })
                        )}
                        onClick={toggleNav}
                        isFlipped={navIsOpen}
                        before={<Menu />}
                        after={<Close />}
                    />
                </HeaderBar>
                {<ThreadNavigationPanel isShow={navIsOpen} sceneNavInfo={sceneNavInfo} />}
                {children}
            </InformationThreadContainer >
        </>
    )
}


export default InformationThread;
