import { styled } from "@pigment-css/react";
import React from "react";

const FlippingIconContainer = styled("div")(({ theme }) => ({
    lineHeight: 0,
    transform: "scaleY(-100%)",
    transition: `all ${theme.transition.short} cubic-bezier(0.5, -1, 0.5, 2)`,
    "&.flipped": {
        transform: "scaleY(100%)",
    }
}));


interface FlippingIconProps {
    before: React.ReactElement,
    after?: React.ReactElement,
    isFlipped: boolean,
}

const FlippingIcon = React.forwardRef<HTMLDivElement, FlippingIconProps & React.HTMLAttributes<HTMLDivElement>>(
    function FlippingIcon({ before, after, isFlipped, className, ...other }, ref) {
        return (
            <FlippingIconContainer className={className + (isFlipped ? " flipped" : "")}
                ref={ref} {...other} >
                {
                    isFlipped && after ? after : before
                }
            </ FlippingIconContainer>
        )
    }
)

export default FlippingIcon;

