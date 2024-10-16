import * as React from 'react';
import { styled } from "@pigment-css/react";

const PanelContainer = styled("div")(({ theme }) => ({
    boxSizing: "border-box", position: "relative",
    padding: theme.padding.panel,
}));

const PanelBackground = styled("div")(({ theme }) => ({
    backgroundColor: `${theme.vars.colors.primary.contrastText}`,
    opacity: 0.1, position: "absolute", inset: 0, overflowY: "hidden", zIndex: -1
}))

const Panel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    function Panel({ children, ...other }, ref) {
        return (
            <PanelContainer {...other} ref={ref}>
                <PanelBackground />
                {children}
            </PanelContainer>
        )
    }
)

export default Panel;