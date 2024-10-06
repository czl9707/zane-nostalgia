"use client"

import * as React from 'react';

import ButtonBase from "./ButtonBase"
import { styled } from '@pigment-css/react';
import { DummyIcon, KeyboardArrowDown } from './Icons';

const AccordingHierachyContext = React.createContext<number>(0);

interface AccordinProps {
    children?: React.ReactNode,
    buttonContent: React.ReactNode,
}

const KeyboardArrowDownWithAnimation = styled(KeyboardArrowDown)(({ theme }) => ({
    transform: "scaleY(-100%)",
    transition: `all ${theme.transition.short} cubic-bezier(0.5, -1, 0.5, 2)`,
    "&.closed": {
        transform: "scaleY(100%)",
    }
}));

const AccordinContentContainer = styled("div")(({ theme }) => ({
    display: "grid", gridTemplateRows: "1fr",
    transition: `all ${theme.transition.long} ease-out`,
    transformOrigin: "top",
    "&>div": {
        display: "flex", flexDirection: "column", alignItems: "stretch",
        boxSizing: "border-box", overflow: "hidden",

        opacity: 1,
        boxShadow: `0 -0.1px 0 ${theme.vars.colors.primary.contrastText}`,
        padding: ".5rem 0 .5rem 0",
        transition: `opacity ${theme.transition.short} ease-in ${theme.transition.short},
                    padding ${theme.transition.long} ease-out,
                    boxShadow ${theme.transition.short} ease-in`,
    },
    "&.closed": {
        gridTemplateRows: "0fr",
        ">div": {
            transition: `opacity ${theme.transition.short} ease-in`,
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

function Accordin({ children, buttonContent }: AccordinProps) {
    const [isOpen, setIsOpen] = React.useState<boolean>(false)
    const toggle = () => setIsOpen((isOpen) => !isOpen)

    const currentHierachy = React.useContext(AccordingHierachyContext);

    return (
        <AccordingHierachyContext.Provider value={currentHierachy + 1}>
            <ButtonBase variant='filled' color="transparent" onClick={toggle}>
                <div style={{ width: `${currentHierachy}rem` }} />
                {buttonContent}
                <div style={{ flex: "1 1 5rem" }} />
                <KeyboardArrowDownWithAnimation style={{ flex: "none" }}
                    className={isOpen ? undefined : "closed"} />
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