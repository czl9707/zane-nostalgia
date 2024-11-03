import { styled } from "@pigment-css/react";
import React from "react";



const FlippingIconContainer = styled("div")<{ direction?: 'vertical' | 'horizontal' }>(({ theme }) => ({
    lineHeight: 0,
    transform: ({ direction = 'vertical' }) => `scale${direction == 'horizontal' ? 'X' : 'Y'}(-100%)`,
    transition: `all ${theme.transition.short} cubic-bezier(0.5, -1, 0.5, 2)`,
    "&.flipped": {
        transform: ({ direction = 'vertical' }) => `scale${direction == 'horizontal' ? 'X' : 'Y'}(100%)`,
    }
}));


interface FlippingIconProps {
    before: React.ReactElement,
    after?: React.ReactElement,
    isFlipped: boolean,
    direction?: 'vertical' | 'horizontal',
}

const FlippingIcon = React.forwardRef<HTMLDivElement, FlippingIconProps & React.HTMLAttributes<HTMLDivElement>>(
    function FlippingIcon({ before, after, isFlipped, direction, className, ...other }, ref) {
        return (
            <FlippingIconContainer direction={direction} className={className + (isFlipped ? " flipped" : "")}
                ref={ref} {...other} >
                {
                    isFlipped && after ? after : before
                }
            </ FlippingIconContainer>
        )
    }
)

export default FlippingIcon;

