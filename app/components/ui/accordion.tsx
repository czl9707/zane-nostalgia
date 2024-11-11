"use client"

import * as React from 'react';

import Button from "./button"
import { keyframes, styled } from '@pigment-css/react';
import * as AccordionPrimitive from '@radix-ui/react-accordion'

import { KeyboardArrowDown } from './icons/icons';
import { useRouter } from 'next/navigation';


const AccordionHierachyContext = React.createContext<number>(0);

interface AccordionProps {
    children?: React.ReactNode,
    name: string,
}

interface AccordionButtonProps {
    children: React.ReactNode,
}

interface AccordionLinkProps {
    href: string,
    children: React.ReactNode,
}


const slideDown = keyframes({
    "0%": { height: 0, opacity: 0 },
    "50%": { height: "var(--radix-accordion-content-height)", opacity: 0 },
    "100%": { height: "var(--radix-accordion-content-height)", opacity: 1 },
})
const slideUp = keyframes({
    "100%": { height: 0, opacity: 0 },
    "50%": { height: "var(--radix-accordion-content-height)", opacity: 0 },
    "0%": { height: "var(--radix-accordion-content-height)", opacity: 1 },
})
const AccordionContent = styled(AccordionPrimitive.Content)(({ theme }) => ({
    "&[data-state='open']": {
        animation: `${slideDown} ${theme.transition.long} linear`,
    },
    "&[data-state='closed']": {
        animation: `${slideUp} ${theme.transition.long} linear`,
    },
}));

const AccordionTrigger = styled(AccordionPrimitive.Trigger)(({ theme }) => ({
    "svg": {
        transition: `all ${theme.transition.short} cubic-bezier(0.5, -1, 0.5, 2)`,
    },
    "&[data-state='open']": {
        "svg": { transform: `scaleY(-100%)` }
    },
    "&[data-state='closed']": {
        "svg": { transform: `scaleY(100%)` }
    },
}));

const AccordionButton = React.forwardRef<HTMLDivElement, Omit<AccordionButtonProps & React.HTMLAttributes<HTMLDivElement>, "color">>(
    function AccordionButton({ children, ...other }, ref) {
        const currentHierachy = React.useContext(AccordionHierachyContext);

        return (
            <Button variant='filled' color="transparent" {...other} ref={ref}
                style={{ paddingLeft: `${currentHierachy * 2 + 1}rem` }}>
                {children}
            </Button>
        )
    }
)

const AccordionLink = React.forwardRef<HTMLDivElement, Omit<AccordionLinkProps & React.HTMLAttributes<HTMLDivElement>, "color">>(
    function AccordionLink({ children, href, ...other }, ref) {
        const router = useRouter();

        return (
            <AccordionButton ref={ref} {...other} onClick={() => router.push(href)}>
                {children}
            </AccordionButton>
        )
    }
)

function Accordion({ children, name }: AccordionProps) {
    const currentHierachy = React.useContext(AccordionHierachyContext);

    return (
        <AccordionHierachyContext.Provider value={currentHierachy + 1}>
            <AccordionPrimitive.Item value={name}>
                <AccordionTrigger asChild>
                    <Button variant='filled' color="transparent"
                        style={{ paddingLeft: `${currentHierachy * 2 + 1}rem` }}>
                        {name}
                        <KeyboardArrowDown style={{ flex: "none" }} />
                    </Button>
                </AccordionTrigger>
                <AccordionContent>
                    {children}
                </AccordionContent>
            </AccordionPrimitive.Item>
        </AccordionHierachyContext.Provider>
    )
}

const AccordionGroup = AccordionPrimitive.Root;

export { AccordionLink, AccordionButton, Accordion, AccordionGroup }