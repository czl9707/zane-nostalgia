"use client"

import * as React from 'react';

import HeaderBar from './header-bar';
import { usePathname } from 'next/navigation';


const MenuContext = React.createContext<{ isMenuOpen: boolean, toggleMenu: () => void }>(
    { isMenuOpen: false, toggleMenu: () => { } }
);
const FullScreenContext = React.createContext<boolean>(true);

export default function HeaderBarWithContextProvider({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setMenuOpen] = React.useState<boolean>(false);
    const [isFullScreen, setFullScreen] = React.useState<boolean>(true);
    const toggleMenu = () => setMenuOpen(isOpen => !isOpen);
    const toggleFullScreen = () => setFullScreen(isFull => !isFull);

    const currentPath = usePathname();
    React.useEffect(() => {
        if (currentPath == "/") setMenuOpen(false);
    }, [currentPath]);

    return (
        <FullScreenContext.Provider value={isFullScreen}>
            <MenuContext.Provider value={{ isMenuOpen, toggleMenu }}>
                <HeaderBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}
                    isFullScreen={isFullScreen} toggleFullScreen={toggleFullScreen} />
                {children}
            </MenuContext.Provider>
        </FullScreenContext.Provider>
    )
}

export { MenuContext, FullScreenContext }
