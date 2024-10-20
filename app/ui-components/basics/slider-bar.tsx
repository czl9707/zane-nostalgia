"use client"

import * as React from 'react';
import useForkRef from '../utils/useForkRef';
import { styled } from '@pigment-css/react';
import { H6Typography } from './typography';

interface SliderBarProps {
    label: string,
    min: number,
    max: number,
    step?: number,
    onChange?: (v: number) => void,
    defaultValue?: number,
}

const SliderBarContainer = styled("div")(({ theme }) => ({
    userSelect: "none",
    position: "relative", height: "2rem",
    padding: ".6rem 0", boxSizing: "border-box",
    cursor: "grab",
    "&:hover": {
        [`${SliderBarButton}`]: {
            boxShadow: `0 0 4px ${theme.vars.colors.primary.contrastText}`,
        }
    },
    "&:active": {
        [`${SliderBarButton}`]: {
            backgroundColor: theme.vars.colors.primary.background,
            boxShadow: `0 0 4px ${theme.vars.colors.primary.contrastText}`,
        }
    },
}));

const SliderBarButton = styled("div")(({ theme }) => ({
    position: "absolute", width: "1rem", height: "2rem", top: 0, zIndex: 1,
    transform: "translateX(-50%)",
    transition: `background-color ${theme.transition.short} linear,
                box-shadow ${theme.transition.short} linear`,
    backgroundColor: theme.vars.colors.secondary.background,
    boxShadow: `0 0 1.5px ${theme.vars.colors.secondary.contrastText}`,
}));

const SliderBarTrack = styled("div")(({ theme }) => ({
    position: "relative", width: "100%", height: ".8rem",
    backgroundColor: theme.vars.colors.primary.background,
    boxShadow: `0 0 1px ${theme.vars.colors.primary.contrastText}`,
}));


const SliderBar = React.forwardRef<HTMLDivElement, SliderBarProps>(
    function SliderBar({
        label = "",
        min,
        max,
        step = 1,
        defaultValue,
        onChange,
    }, ref) {
        const [value, setValue] = React.useState<number>(defaultValue == undefined ? min : defaultValue);
        const divRef = React.useRef<HTMLDivElement | undefined>();
        const composedRef = useForkRef(ref, divRef);

        const handleMouseDown = React.useMemo(() => {
            function fitInStep(v: number): number {
                v = Math.max(Math.min(max, v), min);
                return v - ((v - min) % step);
            }

            function handleMouseMove(e: MouseEvent) {
                if (!divRef.current) return;

                const barWidth = divRef.current.getBoundingClientRect().width;
                const barLeft = divRef.current.getBoundingClientRect().left;
                const offset = e.clientX;
                const exactValue = ((offset - barLeft) / barWidth) * (max - min) + min;

                setValue(fitInStep(exactValue));
            }

            function handleMouseUp() {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
                // using setting to avoid racing condition

                if (onChange) setValue(v => {
                    onChange(v);
                    return v;
                });
            }
            function handleMouseDown() {
                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
            }
            return handleMouseDown;
        }, [max, min, step, onChange]);

        return (
            <>
                <div style={{ width: "100%", display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                    <H6Typography>{label}</H6Typography>
                    <div style={{ flex: "1 1" }} />
                    <H6Typography>{value}</H6Typography>
                </div>
                <SliderBarContainer ref={composedRef} onMouseDown={handleMouseDown}>
                    <SliderBarTrack />
                    <SliderBarButton style={{ left: `${(value - min) / (max - min) * 100}%` }} />
                </SliderBarContainer>
            </>
        )
    }
);




export default SliderBar;
export type { SliderBarProps }