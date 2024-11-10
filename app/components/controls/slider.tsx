"use client"

import * as React from 'react';
import { styled } from '@pigment-css/react';

import InputInfo from './input-info';
import { H6Typography } from '../ui/typography';
import * as SliderPrimitive from '@radix-ui/react-slider';


interface SliderProps {
    label: string,
    min: number,
    max: number,
    step?: number,
    onChange?: (v: number) => void,
    defaultValue: number,
}

const SliderContainer = styled(SliderPrimitive.Root)(({ theme }) => ({
    userSelect: "none", display: "flex", alignItems: "center",
    position: "relative", height: "2rem",
    boxSizing: "border-box",
    cursor: "grab",
    "&:hover": {
        [`${SliderThumb}`]: {
            boxShadow: `0 0 4px ${theme.vars.colors.primary.contrastText}`,
        }
    },
    "&:active": {
        [`${SliderThumb}`]: {
            backgroundColor: theme.vars.colors.primary.background.solid,
            boxShadow: `0 0 4px ${theme.vars.colors.primary.contrastText}`,
        }
    },
}));

const SliderThumb = styled(SliderPrimitive.Thumb)(({ theme }) => ({
    position: "absolute", width: "1rem", height: "2rem", top: 0, zIndex: 1,
    transform: "translateX(-50%) translateY(-50%)",
    transition: `background-color ${theme.transition.short} linear,
                box-shadow ${theme.transition.short} linear`,
    backgroundColor: theme.vars.colors.secondary.background.solid,
    boxShadow: `0 0 1.5px ${theme.vars.colors.secondary.contrastText}`,
}));

const SliderTrack = styled(SliderPrimitive.Track)(({ theme }) => ({
    position: "relative", width: "100%", height: ".8rem",
    backgroundColor: theme.vars.colors.primary.background.solid,
    boxShadow: `0 0 1px ${theme.vars.colors.primary.contrastText}`,
}));


const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
    function Slider({
        label = "",
        min,
        max,
        step = 1,
        defaultValue,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onChange = (_) => { },
    }, ref) {
        const [value, setValue] = React.useState<number>(defaultValue);

        return (
            <div>
                <InputInfo>
                    <H6Typography>{label}</H6Typography>
                    <H6Typography>{value}</H6Typography>
                </InputInfo>
                <SliderContainer value={[value]}
                    min={min} max={max} step={step} ref={ref}
                    onValueChange={(vs) => {
                        setValue(vs[0]);
                        onChange(vs[0]);
                    }} >
                    <SliderTrack />
                    <SliderThumb />
                </SliderContainer>
            </div>
        )
    }
);




export default Slider;
export type { SliderProps }