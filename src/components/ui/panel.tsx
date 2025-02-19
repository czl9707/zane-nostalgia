import * as React from 'react';
import { styled } from "@pigment-css/react";
import { ColorVariation } from '@pigment-css/react/theme';

interface PanelProps {
    color?: ColorVariation | 'transparent';
}

const PanelContainer = styled("div")<PanelProps>(({ theme }) => ({
    backgroundColor: ({ color = "primary" }) => {
        if (color === "transparent")
            return "transparent";
        return `rgb(${theme.vars.colors[color].contrastText} / 6%)`;
    },
    color: ({ color = "primary" }) => {
        if (color === "transparent")
            color = "primary";
        return `rgb(${theme.vars.colors[color].contrastText})`;
    },
    boxSizing: "border-box", position: "relative",
    padding: theme.padding.panel,
}));


const Panel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & PanelProps>(
    function Panel({ children, color, ...other }, ref) {
        return (
            <PanelContainer color={color} {...other} ref={ref}>
                {children}
            </PanelContainer>
        )
    }
)

export default Panel;