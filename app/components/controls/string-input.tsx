"use client"

import * as React from 'react';
import { styled } from "@pigment-css/react";
import ControlStructure from './control-structure';
import { BodyTypography } from '../ui/typography';

// same as color
const StringInputContainer = styled("div")(({ theme }) => ({
    height: "1.7rem", userSelect: "none", padding: 2, boxSizing: "border-box",
    boxShadow: `0 0 1.5px ${theme.vars.colors.secondary.contrastText}`,
    transition: `box-shadow ${theme.transition.short} linear`,
    "&:hover": {
        boxShadow: `0 0 4px ${theme.vars.colors.primary.contrastText},
                    inset 0 0 4px ${theme.vars.colors.primary.contrastText}`,
    },
    "&:has(input:focus)": {
        boxShadow: `0 0 4px ${theme.vars.colors.primary.contrastText},
                    inset 0 0 4px ${theme.vars.colors.primary.contrastText}`,
    }
}));

const StringInputEL = styled("input")(({ theme }) => ({
    "&[type=\"text\" i]": {
        border: "none", outline: "none", borderRadius: 0,
        padding: "0 .5rem", margin: 0,
        display: "inline-flex", alignItems: "center",
        boxShadow: "none",
        paddingBlock: 0, paddingInline: '.5rem',
        width: "100%", height: "100%",
        backgroundColor: "transparent",
        fontFamily: theme.typographies.body.fontFamily,
        fontSize: theme.typographies.body.fontSize,
        fontWeight: theme.typographies.body.fontWeight,
        lineHeight: theme.typographies.body.lineHeight,
    },

    // width: 100%;
    // display: inline-flex;
    // align-items: center;
    // justify-content: center;
    // border-radius: 4px;
    // font-size: 15px;
    // color: white;
    // background-color: var(--black-a2);
    // box-shadow: 0 0 0 1px var(--black-a6);
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