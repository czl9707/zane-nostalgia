import { styled } from "@pigment-css/react";
import { H2Typography, H5Typography } from "../components/ui/typography";
import Panel from "../components/ui/panel";
import TypingTypography from "../components/ui/typing-typography";
import StartCustomizingButton from "./extending-button";

const CenteredSpacedDiv = styled("div")(({ theme }) => ({
    [`@media(min-width: ${theme.breakpoints.lg})`]: {
        padding: `0 calc(50% - ${theme.breakpoints.lg} / 2)`
    },
    [`@media(max-width: ${theme.breakpoints.lg})`]: {
        width: "100%",
    },
    display: "flex", flexDirection: "column", alignItems: "center"
}));

export default function HeroPanel() {
    return (
        <Panel color="transparent">
            <CenteredSpacedDiv>
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

                <div style={{ height: "6rem" }} />

                <StartCustomizingButton href={"/scenes/rainy"} content={"Start Customizing"} />
            </CenteredSpacedDiv>
        </Panel>
    )
}