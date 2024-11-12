import { keyframes, styled } from "@pigment-css/react";
import { ColorVariation } from "@pigment-css/react/theme";
import * as React from "react";

interface ButtonProps {
    variant: "outline" | "filled"
    color?: ColorVariation | 'transparent'
}

const ripple = keyframes({
    "from": {
        opacity: 0.4, transform: "scale(0)"
    },
    "to": {
        opacity: 0, transform: "scale(150%)"
    }
})

const OnHoverMask = styled("div")(({ theme }) => ({
    opacity: 0, background: "grey", position: "absolute",
    inset: 0, zIndex: 1,
    transition: `all ${theme.transition.short} linear`,
}));

const OnClickMask = styled("div")({
    background: "grey", position: "absolute",
    inset: 0, zIndex: 0, borderRadius: "50%",
    animation: `${ripple} .5s`,
    visibility: "hidden", opacity: 0
})

const ButtonContainer = styled("div")<ButtonProps>(({ theme }) => ({
    margin: 0, position: "relative", cursor: "pointer", userSelect: "none",
    display: "inline-flex", alignItems: "center", justifyContent: "space-between",
    paddingLeft: "1rem", paddingRight: "1rem",
    paddingTop: ".5rem", paddingBottom: ".5rem",
    boxSizing: "border-box",
    fontFamily: theme.typographies.button.fontFamily,
    lineHeight: theme.typographies.button.lineHeight,
    fontSize: theme.typographies.button.fontSize,
    overflow: "hidden",
    backgroundColor: ({ color = "transparent" }) => {
        if (color === "transparent") return "transparent";
        else return theme.vars.colors[color].contrastText;
    },
    color: ({ color = "transparent" }) => {
        if (color === "transparent") return theme.vars.colors.primary.contrastText;
        return theme.vars.colors[color].background.solid;
    },
    border: ({ variant }) => variant === "outline" ? ".5px solid grey" : undefined,

    "&:hover": {
        [`${OnHoverMask}`]: {
            opacity: 0.15,
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

const Button = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & ButtonProps>(
    function Button({ children, ...other }, ref) {
        return <ButtonContainer {...other} ref={ref}>
            <OnHoverMask />
            <OnClickMask />
            {children}
        </ButtonContainer>
    }
)

export default Button;
export type { ButtonProps }