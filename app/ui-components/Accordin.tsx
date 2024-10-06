"use client"

import * as React from 'react';

import ButtonBase from "./ButtonBase"
import { styled } from '@pigment-css/react';
import { DummyIcon, KeyboardArrowDown } from './Icons/Icons';
import FlippingIcon from './Icons/FlippingIcon';

const AccordingHierachyContext = React.createContext<number>(0);

interface AccordinProps {
    children?: React.ReactNode,
    buttonContent: React.ReactNode,
    defaultOpen?: boolean,
}

const AccordinContentContainer = styled("div")(({ theme }) => ({
    display: "grid", gridTemplateRows: "1fr",
    transition: `grid-template-rows ${theme.transition.short} linear`,
    transformOrigin: "top",
    "&>div": {
        display: "flex", flexDirection: "column", alignItems: "stretch",
        boxSizing: "border-box", overflow: "hidden",

        opacity: 1,
        boxShadow: `0 -0.1px 0 ${theme.vars.colors.primary.contrastText}`,
        padding: ".5rem 0 .5rem 0",
        transition: `opacity ${theme.transition.short} linear ${theme.transition.short},
                    padding ${theme.transition.short} linear,
                    box-shadow ${theme.transition.short} linear`,
    },
    [`&.closed`]: {
        gridTemplateRows: "0fr",
        transition: `grid-template-rows ${theme.transition.short} linear ${theme.transition.short}`,
        ">div": {
            transition: `opacity ${theme.transition.short} linear,
                    padding ${theme.transition.short} linear  ${theme.transition.short},
                    box-shadow ${theme.transition.short} linear`,
            opacity: 0, boxShadow: "none", padding: 0
        }
    }
}));

interface AccordinButtonProps {
    text: string,
    icon?: React.ReactNode,
}

const AccordinButton = React.forwardRef<HTMLDivElement, Omit<AccordinButtonProps & React.HTMLAttributes<HTMLDivElement>, "color">>(
    function AccordinButton({ text, icon, ...other }, ref) {
        const currentHierachy = React.useContext(AccordingHierachyContext);

        return (
            <ButtonBase variant='filled' color="transparent" {...other} ref={ref}>
                <div style={{ width: `${currentHierachy}rem` }} />
                {text}
                <div style={{ flex: "1 1 5rem" }} />
                {
                    icon ? icon : <DummyIcon />
                }
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
            <ButtonBase variant='filled' color="transparent" onClick={toggle}>
                <div style={{ width: `${currentHierachy}rem` }} />
                {buttonContent}
                <div style={{ flex: "1 1 5rem" }} />
                <FlippingIcon
                    before={<KeyboardArrowDown style={{ flex: "none" }} />}
                    isFlipped={!isOpen}
                />
            </ButtonBase>
            <AccordinContentContainer className={isOpen ? undefined : "closed"} >
                <div>
                    {children}
                </div>
            </AccordinContentContainer>
        </AccordingHierachyContext.Provider>
    )
}

export { AccordinButton, Accordin }