import * as React from 'react';
import { styled } from "@pigment-css/react";
import { ColorVariation } from '@pigment-css/react/theme';

interface PanelProps {
    color?: ColorVariation
}

const PanelContainer = styled("div")<PanelProps>(({ theme }) => ({
    backgroundColor: ({ color = "primary" }) => `${theme.vars.colors[color].background.contrastOpaque}`,
    color: ({ color = "primary" }) => `${theme.vars.colors[color].contrastText}`,
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