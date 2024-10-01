import { CSSObjectNoCallback, styled } from "@pigment-css/react";

import { ColorVariation, ThemeArgs, TypographyVairation } from "@pigment-css/react/theme";
import * as React from "react";

interface TypographyProps {
    color: ColorVariation
}

function styledTypographyPropsFactory(
    typographyVariation: TypographyVairation
): ((themeArgs: ThemeArgs) => CSSObjectNoCallback) {
    return ({ theme }: ThemeArgs) => ({
        margin: 0, padding: 0,
        fontFamily: theme.typographies[typographyVariation].fontFamily,
        fontSize: theme.typographies[typographyVariation].fontSize,
        fontWeight: theme.typographies[typographyVariation].fontWeight,
        lineHeight: theme.typographies[typographyVariation].lineHeight,
        variants: [
            {
                props: { color: 'primary' },
                style: { color: theme.vars.colors.primary.contrastText },
            },
            {
                props: { color: 'secondary' },
                style: { color: theme.vars.colors.secondary.contrastText },
            },
        ]
    });
}

export const H1Typography = styled("h1")<TypographyProps>(styledTypographyPropsFactory("h1"));
export const H2Typography = styled("h2")<TypographyProps>(styledTypographyPropsFactory("h2"));
export const H3Typography = styled("h3")<TypographyProps>(styledTypographyPropsFactory("h3"));
export const H4Typography = styled("h4")<TypographyProps>(styledTypographyPropsFactory("h4"));
export const H5Typography = styled("h5")<TypographyProps>(styledTypographyPropsFactory("h5"));
export const H6Typography = styled("h6")<TypographyProps>(styledTypographyPropsFactory("h6"));
export const BodyTypography = styled("p")<TypographyProps>(styledTypographyPropsFactory("body"));
export const ButtonTypography = styled("p")<TypographyProps>(styledTypographyPropsFactory("button"));
export const QuoteTypography = styled("p")<TypographyProps>(styledTypographyPropsFactory("quote"));
