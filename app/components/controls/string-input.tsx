"use client"

import * as React from 'react';
import { styled } from "@pigment-css/react";
import ControlStructure from './control-structure';


const StringInputEL = styled("input")(({ theme }) => ({
    "&[type=\"text\" i]": {
        border: "none", outline: "none", borderRadius: 0, boxSizing: "border-box",
        padding: "0 .5rem", margin: 0,
        display: "inline-flex", alignItems: "center",
        paddingBlock: 0, paddingInline: '.5rem',
        width: undefined, height: "1.7rem", // same as color
        backgroundColor: "transparent",
        fontFamily: theme.typographies.body.fontFamily,
        fontSize: theme.typographies.body.fontSize,
        fontWeight: theme.typographies.body.fontWeight,
        lineHeight: theme.typographies.body.lineHeight,
    },
    boxShadow: `0 0 1.5px ${theme.vars.colors.secondary.contrastText}`,
    transition: `box-shadow ${theme.transition.short} linear`,
    "&:hover": {
        boxShadow: `0 0 4px ${theme.vars.colors.primary.contrastText},
                    inset 0 0 4px ${theme.vars.colors.primary.contrastText}`,
    },
    "&:focus": {
        boxShadow: `0 0 4px ${theme.vars.colors.primary.contrastText},
                    inset 0 0 4px ${theme.vars.colors.primary.contrastText}`,
    }
}));


interface StringInputProps {
    label: string,
    onChange?: (v: string) => void,
    defaultValue?: string,
}

const StringInput = React.forwardRef<HTMLInputElement, StringInputProps & Omit<React.HTMLAttributes<HTMLInputElement>, "onChange">>(
    function StringInput({ defaultValue = "", label, onChange, ...other }, ref) {
        const [value, setValue] = React.useState<string>(defaultValue);

        return (
            <ControlStructure label={label}>
                <StringInputEL type="text" value={value} name={label} {...other}
                    aria-label={label} ref={ref} placeholder="Your Text Here..."
                    onChange={(e) => {
                        setValue(e.target.value);
                        if (onChange) onChange(e.target.value);
                    }} />
            </ControlStructure>
        )
    }
)

export default StringInput;
export type { StringInputProps }