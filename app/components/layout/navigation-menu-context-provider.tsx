"use client"

import * as React from 'react';

import HeaderBar from './header-bar';


const MenuContext = React.createContext<boolean>(false);

export default function NavigationMenuContextProvider({ children }: { children: React.ReactNode }) {
    const [isMenuOpen, setMenuOpen] = React.useState<boolean>(false);
    const toggleMenu = () => setMenuOpen(isOpen => !isOpen);

    return (
        <MenuContext.Provider value={isMenuOpen}>
            <HeaderBar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            {children}
        </MenuContext.Provider>
    )
}

export { MenuContext }
