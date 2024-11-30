"use client"

import React from "react";
import { styled } from "@pigment-css/react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import ControlStructure from './control-structure';

const ToggleGroupRoot = styled(ToggleGroupPrimitive.Root)(({ theme }) => ({
    border: "none", padding: 0, margin: 0, display: "flex"
}));

const ToggleGroupItem = styled(ToggleGroupPrimitive.Item)(({ theme }) => ({
    border: "none", flex: "1 1",

    background: `color-mix(in srgb, ${theme.vars.colors.primary.contrastText} 6%, transparent)`,
    boxShadow: `inset 0 0 ${theme.boxShadow.thickness.normal}px ${theme.vars.colors.primary.contrastText}`,
    transition: `box-shadow ${theme.transition.short} linear`,
    "&:hover": {
        boxShadow: `inset 0 0 ${theme.boxShadow.thickness.focus / 2}px ${theme.vars.colors.primary.contrastText}`,
    },
    "&[data-state='on']": {
        background: `color-mix(in srgb, ${theme.vars.colors.primary.background}, transparent)`,
        boxShadow: `inset 0 0 ${theme.boxShadow.thickness.focus / 2}px ${theme.vars.colors.primary.contrastText}`,
    }
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