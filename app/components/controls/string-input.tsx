"use client"

import * as React from 'react';
import { styled } from "@pigment-css/react";
import ControlStructure from './control-structure';

const StringInputContainer = styled("div")(({ theme }) => ({
    height: "1.5rem", userSelect: "none", padding: 2, boxSizing: "border-box",
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

const StringInputEL = styled("input")({
    "&[type=\"text\" i]": {
        border: "none", padding: 0, margin: 0,
        paddingBlock: 0, paddingInline: 0,
        width: "100%", height: "100%",
        backgroundColor: "transparent",
        cursor: "pointer",
    }
});


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
                <StringInputContainer>
                    <StringInputEL type="text" value={value} name={label} {...other}
                        aria-label={label} ref={ref}
                        onChange={(e) => {
                            setValue(e.target.value);
                            if (onChange) onChange(e.target.value);
                        }} />
                </StringInputContainer>
            </ControlStructure>
        )
    }
)

export default StringInput;
export type { StringInputProps }