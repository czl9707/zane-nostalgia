import { styled } from "@pigment-css/react";

interface DividerProps {
    direction?: "vertical" | "horizontal"
}

const Divider = styled("div")<DividerProps>(({ theme }) => ({
    margin: `${theme.padding.panel} 0`,
    padding: 0, height: .1, width: "100%",

    boxShadow: ({ direction = "horizontal" }) =>
        direction === "horizontal" ?
            `0 -0.1px 0 ${theme.vars.colors.primary.contrastText}` :
            `-0.1px 0 0 ${theme.vars.colors.primary.contrastText}`,
}));

export default Divider;