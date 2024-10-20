"use client"

import * as React from 'react'
import { styled } from "@pigment-css/react";

import FlippingIcon from '../icons/flipping-icon';
import { Copy, Check } from '../icons/icons';
import { ButtonTypography, QuoteTypography } from './typography';
import InputInfo from './input-info';

interface CopyPanelProps {
    children?: string,
    label?: string,
}

const IconContainer = styled("div")(({ theme }) => ({
    position: "absolute", right: '.8rem', top: '.8rem',
    padding: ".1rem", borderRadius: ".2rem", border: `1px solid ${theme.vars.colors.secondary.contrastText}`,
    background: `${theme.vars.colors.secondary.background.opaque}`,
    opacity: .5,

    transition: `all ${theme.transition.short} ease-out`,
}));

const CopyPanelContainer = styled("div")(({ theme }) => ({
    position: "relative", width: "100%", boxSizing: "border-box",
    padding: "1rem", paddingRight: "3.5rem",
    borderRadius: ".5rem", border: `1px solid ${theme.vars.colors.secondary.contrastText}`,
    background: `${theme.vars.colors.primary.background.opaque}`,
    "p": {
        width: "100%", maxHeight: "5rem",
        whiteSpace: "normal", overflowY: "scroll",
        overflowWrap: "break-word", wordBreak: "break-all",
    },
    "&:hover": {
        [`${IconContainer}`]: {
            opacity: 1,
            boxShadow: `0 0 4px ${theme.vars.colors.primary.contrastText}`,
        }
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
            <>
                <InputInfo>
                    <ButtonTypography>{label}</ButtonTypography>
                </InputInfo>
                <CopyPanelContainer {...other} ref={ref} onClick={handleCopy}>
                    <IconContainer >
                        <FlippingIcon before={<Copy />} after={<Check />} isFlipped={!!copied} />
                    </IconContainer>
                    <QuoteTypography color="secondary">
                        {children}
                    </QuoteTypography>
                </CopyPanelContainer>
            </>
        );
    }
)

export default CopyPanel;