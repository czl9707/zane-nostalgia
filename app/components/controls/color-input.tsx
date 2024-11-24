"use client"

import * as React from 'react';
import { styled } from "@pigment-css/react";
import ControlStructure from './control-structure';

const ColorInputEL = styled("input")({
    "&[type=\"color\" i]": {
        border: "none", padding: 0, margin: 0,
        paddingBlock: 0, paddingInline: 0,
        width: "100%", height: "100%",
        backgroundColor: "transparent",
        userSelect: "none", cursor: "pointer",

        "&::-webkit-color-swatch": {
            border: "none", padding: 0, margin: 0, height: "100%"
        },
        "&::-webkit-color-swatch-wrapper": {
            border: "none", padding: 0, margin: 0, height: "100%"
        },
    }
});

const ColorInputContainer = styled("div")(({ theme }) => ({
    height: "1.7rem", userSelect: "none", padding: 2, boxSizing: "border-box",
    boxShadow: `0 0 1.5px ${theme.vars.colors.secondary.contrastText}`,
    transition: `box-shadow ${theme.transition.short} linear`,
    "&:hover": {
        boxShadow: `0 0 4px ${theme.vars.colors.primary.contrastText},
                    inset 0 0 4px ${theme.vars.colors.primary.contrastText}`,
    }
}));

interface ColorInputProps {
    label: string,
    onChange?: (v: string) => void,
    color: string,
}

const ColorInput = React.forwardRef<HTMLDivElement, ColorInputProps & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">>(
    function ColorInput({ color = "#000000", label, onChange, ...other }, ref) {
        // const [color, setColor] = React.useState<string>(defaultColor);

        return (
            <ControlStructure label={label} {...other} ref={ref}>
                <ColorInputContainer>
                    <ColorInputEL type="color" value={color} name={label}
                        aria-label={label}
                        onChange={(e) => {
                            // setColor(e.target.value);
                            if (onChange) onChange(e.target.value);
                        }} />
                </ColorInputContainer>
            </ControlStructure>
        )
    }
)

export default ColorInput;
export type { ColorInputProps }