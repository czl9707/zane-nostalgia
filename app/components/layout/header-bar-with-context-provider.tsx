"use client"

import * as React from 'react';

import HeaderBar from './header-bar';


const MenuContext = React.createContext<boolean>(true);
const FullScreenContext = React.createContext<boolean>(true);

export default function HeaderBarWithContextProvider({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setMenuOpen] = React.useState<boolean>(true);
    const [isFullScreen, setFullScreen] = React.useState<boolean>(true);
    const toggleMenu = () => setMenuOpen(isOpen => !isOpen);
    const toggleFullScreen = () => setFullScreen(isFull => !isFull);

    return (
        <FullScreenContext.Provider value={isFullScreen}>
            <MenuContext.Provider value={isMenuOpen}>
                <HeaderBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}
                    isFullScreen={isFullScreen} toggleFullScreen={toggleFullScreen} />
                {children}
            </MenuContext.Provider>
        </FullScreenContext.Provider>
    )
}

export { MenuContext, FullScreenContext }
