"use client"

import * as React from 'react';
import { css, styled } from "@pigment-css/react";

import HeaderBar from './header-bar';
import { FixedNavigationPanel, NavigationInfo, ThreadNavigationPanel } from './navigation-panel'
import FlippingIcon from '../ui/icons/flipping-icon';
import { Close, DummyIcon, Github, Menu } from '../ui/icons/icons';
import Link from 'next/link';

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
                    <Link href={"https://github.com/czl9707/zane-nostalgia"} target="_blank" rel="noopener noreferrer">
                        <Github />
                    </Link>

                    <>
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
                        <DummyIcon
                            className={css(
                                ({ theme }) => ({
                                    [`@media(max-width: ${theme.breakpoints.lg})`]: { display: "none" }
                                })
                            )} />
                    </>
                </HeaderBar>
                {<ThreadNavigationPanel isShow={navIsOpen} sceneNavInfo={sceneNavInfo} />}
                {children}
            </InformationThreadContainer >
        </>
    )
}


export default InformationThread;
