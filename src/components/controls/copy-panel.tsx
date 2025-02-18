"use client"

import * as React from 'react'
import { styled } from "@pigment-css/react";

import FlippingIcon from '@/components/ui/icons/flipping-icon';
import { Copy, Check } from '@/components/ui/icons/icons';
import { ButtonTypography, QuoteTypography } from '@/components/ui/typography';

interface CopyPanelProps {
    children?: string,
    label?: string,
}

const IconContainer = styled("div")(({ theme }) => ({
    position: "absolute", right: '.8rem', top: '.8rem',
    padding: ".1rem", borderRadius: ".2rem", border: `1px solid ${theme.vars.colors.secondary.contrastText}`,
    background: `color-mix(in srgb, ${theme.vars.colors.secondary.background}, transparent)`,
    opacity: .5,

    transition: `all ${theme.transition.short} ease-out`,
}));

const CopyPanelContainer = styled("div")(({ theme }) => ({
    position: "relative", width: "100%", boxSizing: "border-box",
    padding: "1rem", paddingRight: "3.5rem",
    borderRadius: ".5rem", border: `1px solid ${theme.vars.colors.secondary.contrastText}`,
    background: `color-mix(in srgb, ${theme.vars.colors.primary.background}, transparent)`,
    "p": {
        width: "100%", maxHeight: "5rem", minHeight: "2rem",
        whiteSpace: "normal", overflowY: "scroll",
        overflowWrap: "break-word", wordBreak: "break-all",
    },
    "&:hover": {
        [`${IconContainer}`]: {
            opacity: 1,
            boxShadow: `0 0 ${theme.boxShadow.thickness.normal}px ${theme.vars.colors.primary.contrastText}`,
        }
    },

    "::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
    },
}));


const CopyPanel = React.forwardRef<HTMLDivElement, CopyPanelProps & Omit<React.HtmlHTMLAttributes<HTMLDivElement>, "children">>(
    function CopyPanel({ label = "", children = "", ...other }, ref) {
        const [copied, setCopied] = React.useState<NodeJS.Timeout | undefined>();

        const handleCopy = () => {
            navigator.clipboard.writeText(children);

            clearTimeout(copied);
            setCopied(setTimeout(() => {
                setCopied(undefined);
            }, 5000));
        }

        return (
            <div>
                <ButtonTypography style={{ marginBottom: ".7rem" }}>{label}</ButtonTypography>
                <CopyPanelContainer {...other} ref={ref} onClick={handleCopy}>
                    <IconContainer >
                        <FlippingIcon before={<Copy />} after={<Check />} isFlipped={!!copied} />
                    </IconContainer>
                    <QuoteTypography color="secondary">
                        {children}
                    </QuoteTypography>
                </CopyPanelContainer>
            </div>
        );
    }
)

export default CopyPanel;