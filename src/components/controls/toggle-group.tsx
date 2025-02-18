"use client"

import React from "react";
import { styled } from "@pigment-css/react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import ControlStructure from './control-structure';

const ToggleGroupRoot = styled(ToggleGroupPrimitive.Root)(({ theme }) => ({
    borderRadius: ".5rem", overflow: "hidden",
    border: `1px solid color-mix(in srgb, ${theme.vars.colors.primary.contrastText} 20%, transparent)`,
    padding: 0, margin: 0, display: "flex"
}));

const ToggleGroupItem = styled(ToggleGroupPrimitive.Item)(({ theme }) => ({
    borderTop: "none", borderBottom: "none", borderLeft: `none`,
    borderRight: `1px solid color-mix(in srgb, ${theme.vars.colors.primary.contrastText} 20%, transparent)`,
    cursor: "pointer",

    flex: "1 1",
    background: `color-mix(in srgb, ${theme.vars.colors.primary.contrastText} 6%, transparent)`,
    transition: `box-shadow ${theme.transition.short} linear`,
    "&:hover": {
        boxShadow: `inset 0 0 ${theme.boxShadow.thickness.focus / 2}px ${theme.vars.colors.primary.contrastText}`,
    },
    "&[data-state='on']": {
        background: `color-mix(in srgb, ${theme.vars.colors.primary.background}, transparent)`,
    },
    "&[data-state='off']": {
        background: `transparent`,
    },
}));


interface ToggleGroupProps {
    label: string,
    onChange?: (v: string) => void,
    value: string,
    children: React.ReactNode,
}

const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">>(
    function ToggleGroup({ value, label, onChange, children, ...other }, ref) {
        return (
            <ControlStructure label={label} {...other} ref={ref}>
                <ToggleGroupRoot type="single"
                    value={value} onValueChange={(v: string) => {
                        if (v && onChange) onChange(v);
                    }}>
                    {children}
                </ToggleGroupRoot>
            </ControlStructure>
        )
    }
)

export default ToggleGroup;
export { ToggleGroupItem };
export type { ToggleGroupProps }