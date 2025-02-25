import { styled } from "@pigment-css/react";

interface DividerProps {
    direction?: "vertical" | "horizontal"
}

const Divider = styled("div")<DividerProps>(({ theme }) => ({
    padding: 0, height: .1, minHeight: .1, userSelect: "none",

    boxShadow: ({ direction = "horizontal" }) =>
        direction === "horizontal" ?
            `0 -0.2px 0 rgb(${theme.vars.colors.primary.contrastText})` :
            `-0.2px 0 0 rgb(${theme.vars.colors.primary.contrastText})`,
}));

export default Divider;