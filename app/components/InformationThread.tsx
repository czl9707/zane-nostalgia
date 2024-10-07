"use client"

import * as React from 'react';
import { css, styled } from "@pigment-css/react";

import HeaderBar from './HeaderBar';
import { ThreadNavigationPanel } from './NavigationPanel'
import FlippingIcon from '../ui-components/Icons/FlippingIcon';
import { Close, Menu } from '../ui-components/Icons/Icons';


const InformationThreadContext = React.createContext<{
    panels: Array<React.ReactNode>,
    setPanels: (panels: Array<React.ReactNode>) => void,
}>({
    panels: [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setPanels: (_) => { }
});


function InformationThreadContextProvider({ children }: { children: React.ReactNode }) {
    const [panels, setPanels] = React.useState<Array<React.ReactNode>>([]);

    return <InformationThreadContext.Provider value={{ panels, setPanels }}>
        {children}
    </InformationThreadContext.Provider>
}


const InformationThreadContainer = styled("div")(({ theme }) => ({
    padding: "4rem", boxSizing: "border-box",
    position: "fixed", overflowY: "scroll",
    right: 0, top: 0, bottom: 0,

    display: "inline-flex", flexDirection: "column", flexWrap: "nowrap",

    [`@media(min-width: ${theme.breakpoints.md})`]: {
        width: theme.breakpoints.md,
    },
    [`@media(max-width: ${theme.breakpoints.md})`]: {
        width: "100%",
    }
}));


function InformationThread() {
    const [navIsOpen, setNavIsOpen] = React.useState<boolean>(false);
    const toggleNav = () => setNavIsOpen((isOpen) => !isOpen);

    const { panels } = React.useContext(InformationThreadContext);

    return (
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
            {<ThreadNavigationPanel isShow={navIsOpen} onNavigate={() => setNavIsOpen(false)} />}
            {panels.map((panel, i) => (
                <React.Fragment key={i}>
                    {panel}
                    <div style={{ height: "4rem" }} />
                </React.Fragment>
            ))}
        </InformationThreadContainer >
    )
}


export default InformationThread;
export { InformationThreadContextProvider, InformationThreadContext }