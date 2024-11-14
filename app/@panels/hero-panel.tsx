import { styled } from "@pigment-css/react";
import { H2Typography, H5Typography } from "../components/ui/typography";
import Panel from "../components/ui/panel";
import TypingTypography from "./typing-typography";
import ButtonLink from "../components/ui/button-link";

const CenteredSpacedDiv = styled("div")(({ theme }) => ({
    [`@media(min-width: ${theme.breakpoints.lg})`]: {
        padding: `0 calc(50% - ${theme.breakpoints.lg} / 2)`
    },
    [`@media(max-width: ${theme.breakpoints.lg})`]: {
        width: "100%",
    },
    display: "flex", flexDirection: "column", alignItems: "center"
}));

const ExtendingLinkButton = styled(ButtonLink)(({ theme }) => ({
    ".former": {
        transition: `width ${theme.transition.short} ease-out`,
        width: ".5rem"
    },
    ".latter": {
        transition: `width ${theme.transition.short} ease-out`,
        width: "1.5rem"
    },
    "&:hover": {
        ".former": { width: "2rem" },
        ".latter": { width: "0rem" },
    }
}));

const Spacer = () => <div style={{ height: "3rem" }} />;

export default function HeroPanel() {
    return (
        <Panel color="transparent">
            <CenteredSpacedDiv>
                <Spacer />
                <Spacer />
                <H2Typography style={{
                    textAlign: "center", textWrap: "balance"
                }}>
                    Animated and Embedable SVGs at Fingertips
                </H2Typography>

                <H5Typography color="secondary" style={{
                    textAlign: "center", textWrap: "balance"
                }}>
                    <br />
                    Nostalgia.Z is a web app for generating customizable, animated SVGs. <br />
                    <TypingTypography contents={["Embed", "Copy", "Download"]} /> for effortless use anywhere.
                </H5Typography>

                <Spacer />
                <Spacer />
                <ExtendingLinkButton variant="filled" color="primary" href="/scenes/rainy">
                    <div style={{ width: "1.5rem" }} />
                    {"Start Customizing"}
                    <div className="former" />
                    {">"}
                    <div className="latter" />
                </ExtendingLinkButton>
                <Spacer />
                <Spacer />
            </CenteredSpacedDiv>
        </Panel>
    )
}