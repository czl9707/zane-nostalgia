import { keyframes, styled } from "@pigment-css/react";
import { ColorVariation } from "@pigment-css/react/theme";
import * as React from "react";

interface ButtonStyleProps {
    variant: "outline" | "filled"
    color: ColorVariation | 'tranparent'
}

const ripple = keyframes({
    "from": {
        opacity: 0.3, transform: "scale(0)"
    },
    "to": {
        opacity: 0, transform: "scale(150%)"
    }
})

const OnHoverMask = styled("div")({
    opacity: 0, background: "grey", position: "absolute",
    inset: 0, zIndex: 1,
    transition: "all .3s linear",
});

const OnClickMask = styled("div")({
    background: "grey", position: "absolute",
    inset: 0, zIndex: 1, borderRadius: "50%",
    animation: `${ripple} .5s`,
    visibility: "hidden", opacity: 0
})

const ButtonBaseDiv = styled("div")<ButtonStyleProps>(({ theme }) => ({
    margin: 0, cursor: "pointer", position: "relative",
    paddingLeft: "1rem", paddingRight: "1rem",
    paddingTop: ".5rem", paddingBottom: ".5rem",
    fontFamily: theme.typographies.button.fontFamily,
    lineHeight: theme.typographies.button.lineHeight,
    fontSize: theme.typographies.button.fontSize,
    overflow: "hidden",
    backgroundColor: ({ color }) => {
        if (color === "tranparent") return "transparent";
        else return theme.vars.colors[color].background;
    },
    color: ({ color }) => {
        if (color === "tranparent") color = "primary";
        return theme.vars.colors[color].contrastText;
    },
    border: ({ variant }) => variant === "outline" ? ".5px solid grey" : undefined,

    "&:hover": {
        [`${OnHoverMask}`]: {
            opacity: 0.08,
        },
        [`${OnClickMask}`]: {
            visibility: "visible"
        },
    },
    "&:active": {
        [`${OnClickMask}`]: {
            animationName: 'none'
        },
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