"use client"

import * as React from 'react'
import { styled } from "@pigment-css/react";

import FlippingIcon from '@/components/ui/icons/flipping-icon';
import { Copy, Check } from '@/components/ui/icons/icons';
import * as T from '@/components/ui/typography';

interface CopyPanelProps {
    children?: string,
    label?: string,
}

const IconContainer = styled("div")(({ theme }) => ({
    position: "absolute", right: '.8rem', top: '.8rem',
    padding: ".1rem", borderRadius: ".2rem", border: `1px solid rgb(${theme.vars.colors.secondary.contrastText})`,
    background: `rgb(${theme.vars.colors.secondary.background} / 50%)`,
    opacity: .5,

    transition: `all ${theme.transition.short} ease-out`,
}));

const CopyPanelContainer = styled("div")(({ theme }) => ({
    position: "relative", width: "100%", boxSizing: "border-box",
    padding: "1rem", paddingRight: "3.5rem",
    borderRadius: ".5rem", border: `1px solid rgb(${theme.vars.colors.secondary.contrastText})`,
    background: `rgb(${theme.vars.colors.primary.background} / 50%)`,
    "p": {
        width: "100%", maxHeight: "5rem", minHeight: "2rem",
        whiteSpace: "normal", overflowY: "scroll",
        overflowWrap: "break-word", wordBreak: "break-all",
    },
    "&:hover": {
        [`${IconContainer}`]: {
            opacity: 1,
            boxShadow: `0 0 ${theme.boxShadow.thickness.normal} rgb(${theme.vars.colors.primary.contrastText})`,
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
                <T.Button style={{ marginBottom: ".7rem" }}>{label}</T.Button>
                <CopyPanelContainer {...other} ref={ref} onClick={handleCopy}>
                    <IconContainer >
                        <FlippingIcon before={<Copy />} after={<Check />} isFlipped={!!copied} />
                    </IconContainer>
                    <T.Quote color="secondary">
                        {children}
                    </T.Quote>
                </CopyPanelContainer>
            </div>
        );
    }
)

export default CopyPanel;