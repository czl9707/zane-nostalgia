import { styled } from "@pigment-css/react";
import * as T from "@/components/ui/typography";
import Panel from "@/components/ui/panel";
import TypingTypography from "@/components/ui/typing-typography";
import StartCustomizingButton from "./extending-button";

const CenteredSpacedDiv = styled("div")(({ theme }) => ({
    [`@media(min-width: ${theme.breakpoint.lg})`]: {
        padding: `0 calc(50% - ${theme.breakpoint.lg} / 2)`
    },
    [`@media(max-width: ${theme.breakpoint.lg})`]: {
        width: "100%",
    },
    display: "flex", flexDirection: "column", alignItems: "center"
}));

export default function HeroPanel() {
    return (
        <Panel color="transparent">
            <CenteredSpacedDiv>
                <T.H1 style={{
                    textAlign: "center", textWrap: "balance", fontWeight: 500
                }}>
                    Animated and Embedable SVGs at Fingertips
                </T.H1>

                <T.H5 color="secondary" style={{
                    textAlign: "center", textWrap: "balance"
                }}>
                    <br />
                    Nostalgia Github Banner is a web app for generating customizable, animated SVGs. <br />
                    <TypingTypography contents={["Embed", "Copy", "Download"]} /> for effortless use anywhere.
                </T.H5>

                <div style={{ height: "6rem" }} />

                <StartCustomizingButton href={"/scenes/rainy"} content={"Start Customizing"} />
            </CenteredSpacedDiv>
        </Panel>
    )
}