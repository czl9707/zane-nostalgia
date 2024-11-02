import * as React from 'react';
import { styled } from "@pigment-css/react";

const PanelContainer = styled("div")(({ theme }) => ({
    backgroundColor: `${theme.vars.colors.primary.background.contrastOpaque}`,
    boxSizing: "border-box", position: "relative",
    padding: theme.padding.panel,
}));


const Panel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    function Panel({ children, ...other }, ref) {
        return (
            <PanelContainer {...other} ref={ref}>
                {children}
            </PanelContainer>
        )
    }
)

export default Panel;