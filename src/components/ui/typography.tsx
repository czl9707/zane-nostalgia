import { CSSPropertiesWithCallback, styled } from "@pigment-css/react";

import { ColorVariation, ThemeArgs, TypographyVairation } from "@pigment-css/react/theme";

interface TypographyProps {
    color?: ColorVariation | "inherit"
}

function styledTypographyPropsFactory(
    typographyVariation: TypographyVairation
): ((themeArgs: ThemeArgs) => CSSPropertiesWithCallback<TypographyProps>) {
    return ({ theme }: ThemeArgs) => ({
        margin: 0, padding: 0, whiteSpace: "nowrap", textWrap: "wrap",
        fontFamily: theme.typographies[typographyVariation].fontFamily,
        fontSize: theme.typographies[typographyVariation].fontSize,
        fontWeight: theme.typographies[typographyVariation].fontWeight,
        lineHeight: theme.typographies[typographyVariation].lineHeight,
        color: (({ color = "inherit" }: TypographyProps) => color === "inherit" ? color : `rgb(${theme.vars.colors[color].contrastText})`),
    });
}

export const H1 = styled("h1")<TypographyProps>(styledTypographyPropsFactory("h1"));
export const H2 = styled("h2")<TypographyProps>(styledTypographyPropsFactory("h2"));
export const H3 = styled("h3")<TypographyProps>(styledTypographyPropsFactory("h3"));
export const H4 = styled("h4")<TypographyProps>(styledTypographyPropsFactory("h4"));
export const H5 = styled("h5")<TypographyProps>(styledTypographyPropsFactory("h5"));
export const H6 = styled("h6")<TypographyProps>(styledTypographyPropsFactory("h6"));
export const Body = styled("p")<TypographyProps>(styledTypographyPropsFactory("body"));
export const Button = styled("p")<TypographyProps>(styledTypographyPropsFactory("button"));
export const Quote = styled("p")<TypographyProps>(styledTypographyPropsFactory("quote"));
