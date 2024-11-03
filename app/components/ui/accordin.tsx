"use client"

import * as React from 'react';

import ButtonBase from "./button/button-base"
import { styled } from '@pigment-css/react';
import { KeyboardArrowDown } from './icons/icons';
import FlippingIcon from './icons/flipping-icon';
import Divider from './divider';
import { useRouter } from 'next/navigation';

const AccordingHierachyContext = React.createContext<number>(0);

interface AccordinProps {
    children?: React.ReactNode,
    buttonContent: React.ReactNode,
    defaultOpen?: boolean,
}

interface AccordinButtonProps {
    children: React.ReactNode,
}

interface AccordinLinkProps {
    href: string,
    children: React.ReactNode,
}


const AccordinContentContainer = styled("div")(({ theme }) => ({
    display: "grid", gridTemplateRows: "1fr",
    transition: `grid-template-rows ${theme.transition.short} linear`,
    transformOrigin: "top",
    "&>div": {
        display: "flex", flexDirection: "column", alignItems: "stretch",
        boxSizing: "border-box", overflow: "hidden",

        opacity: 1,
        transition: `opacity ${theme.transition.short} linear ${theme.transition.short}`,
    },
    [`&.closed`]: {
        gridTemplateRows: "0fr",
        transition: `grid-template-rows ${theme.transition.short} linear ${theme.transition.short}`,
        ">div": {
            transition: `opacity ${theme.transition.short} linear`,
            opacity: 0
        }
    }
}));



const AccordinButton = React.forwardRef<HTMLDivElement, Omit<AccordinButtonProps & React.HTMLAttributes<HTMLDivElement>, "color">>(
    function AccordinButton({ children, ...other }, ref) {
        const currentHierachy = React.useContext(AccordingHierachyContext);

        return (
            <ButtonBase variant='filled' color="transparent" {...other} ref={ref}
                style={{ paddingLeft: `${currentHierachy * 2 + 1}rem` }}>
                {children}
            </ButtonBase>
        )
    }
)

const AccordinLink = React.forwardRef<HTMLDivElement, Omit<AccordinLinkProps & React.HTMLAttributes<HTMLDivElement>, "color">>(
    function AccordinButton({ children, href, ...other }, ref) {
        const router = useRouter();
        const currentHierachy = React.useContext(AccordingHierachyContext);

        return (
            <ButtonBase variant='filled' color="transparent" {...other} ref={ref}
                onClick={() => router.push(href)} style={{ paddingLeft: `${currentHierachy * 2 + 1}rem` }}>
                {children}
            </ButtonBase>
        )
    }
)

function Accordin({ children, buttonContent, defaultOpen = false }: AccordinProps) {
    const [isOpen, setIsOpen] = React.useState<boolean>(defaultOpen)
    const toggle = () => setIsOpen((isOpen) => !isOpen)

    const currentHierachy = React.useContext(AccordingHierachyContext);

    return (
        <AccordingHierachyContext.Provider value={currentHierachy + 1}>
            <ButtonBase variant='filled' color="transparent" onClick={toggle}
                style={{ paddingLeft: `${currentHierachy * 2 + 1}rem` }}>
                {buttonContent}
                <FlippingIcon
                    before={<KeyboardArrowDown style={{ flex: "none" }} />}
                    isFlipped={!isOpen}
                />
            </ButtonBase>
            {isOpen && <Divider />}
            <AccordinContentContainer className={isOpen ? undefined : "closed"} >
                <div>
                    {children}
                </div>
            </AccordinContentContainer>
        </AccordingHierachyContext.Provider>
    )
}

export { AccordinLink, AccordinButton, Accordin }