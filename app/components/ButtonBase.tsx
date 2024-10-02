import { styled } from "@pigment-css/react";
import { ColorVariation } from "@pigment-css/react/theme";
import * as React from "react";

interface ButtonStyleProps {
    variant: "outline" | "filled"
    color: ColorVariation | 'tranparent'
}

const OnHoverMask = styled("div")({
    opacity: 0.1, background: "grey",
    width: "100%", height: "100%", zIndex: -1
});

const OnClickMask = styled("div")({
    opacity: 0.2, background: "grey",
    width: "100%", height: "100%", zIndex: -1
})

const ButtonBaseDiv = styled("div")<ButtonStyleProps>(({ theme }) => ({
    margin: 0, cursor: "pointer",
    paddingLeft: "1rem", paddingRight: "1rem",
    paddingTop: ".5rem", paddingBottom: ".5rem",
    fontFamily: theme.typographies.button.fontFamily,
    lineHeight: theme.typographies.button.lineHeight,
    fontSize: theme.typographies.button.fontSize,
    backgroundColor: ({ color }) => {
        if (color === "tranparent") return "transparent";
        else return theme.vars.colors[color].background;
    },
    color: ({ color }) => {
        if (color === "tranparent") color = "primary";
        return theme.vars.colors[color].contrastText;
    },
    border: ({ variant }) => variant === "outline" ? ".5px solid grey" : undefined,

    transition: "all .3s linear",
    "&:hover": {
        opacity: .9
    }
}));

const ButtonBase = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & ButtonStyleProps>(
    function ButtonBase({ children, ...other }, ref) {
        return <ButtonBaseDiv {...other} ref={ref}>
            <OnHoverMask />
            <OnClickMask />
            {children}
        </ButtonBaseDiv>
    }
)

export default ButtonBase;