"use client"

import * as React from 'react';

import { keyframes, styled, css } from '@pigment-css/react';
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx';

import Button from "./button"
import { KeyboardArrowDown } from './icons/icons';
import Divider from './divider';


interface AccordionProps {
    children?: Iterable<React.ReactNode>,
    name: React.ReactNode,
    value: string,
}

interface AccordionItemProps {
    chilren?: React.ReactNode,
    asChild?: boolean,
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
        animation: `${slideDown} ${theme.transition.long} ease-in`,
    },
    "&[data-state='closed']": {
        animation: `${slideUp} ${theme.transition.long} ease-in`,
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

const AccordianItemStyle = css({
    width: "100%",
    paddingLeft: "2rem",
    boxSizing: "border-box",
})

const AccordionItem = React.forwardRef<HTMLDivElement, Omit<AccordionItemProps & React.HTMLAttributes<HTMLDivElement>, "color">>(
    function AccordionItem({ children, asChild = false, className, ...other }, ref) {
        const Com = asChild ? Slot : "div";

        return (
            <Com {...other} ref={ref} className={clsx(AccordianItemStyle, className)}>
                {children}
            </Com>
        )
    }
)

function Accordion({ children = [], name, value }: AccordionProps) {
    return (
        <AccordionPrimitive.Item value={value}>
            <AccordionTrigger asChild>
                <Button variant='filled' color="transparent"
                    style={{ width: "100%" }}>
                    {name}
                    <KeyboardArrowDown style={{ flex: "none" }} />
                </Button>
            </AccordionTrigger>
            <AccordionContent>
                {React.Children.toArray(children).map((child, i) => (
                    <React.Fragment key={i}>
                        <Divider />
                        {child}
                    </React.Fragment>
                ))}
            </AccordionContent>
        </AccordionPrimitive.Item>
    )
}

const AccordionGroup = AccordionPrimitive.Root;

export { Accordion, AccordionGroup, AccordionItem }