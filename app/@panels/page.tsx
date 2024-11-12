import { styled } from "@pigment-css/react";
import Panel from "../components/ui/panel";
import { H5Typography, H2Typography, ButtonTypography } from "../components/ui/typography";
import Button from "../components/ui/button";
import TypingTypography from "./typing-typography";

const CenteredSpacedDiv = styled("div")(({ theme }) => ({
    [`@media(min-width: ${theme.breakpoints.lg})`]: {
        padding: `0 calc(50% - ${theme.breakpoints.lg} / 2)`
    },
    [`@media(max-width: ${theme.breakpoints.lg})`]: {
        width: "100%",
    },
    display: "flex", flexDirection: "column", alignItems: "center"
}));

const ExtendingButton = styled(Button)(({ theme }) => ({
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


export default function HomePanels() {
    const Spacer = () => <div style={{ height: "2rem" }} />;
    return (
        [
            <Panel key={"Head"}>
                <CenteredSpacedDiv>
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
                        <br /><br />
                    </H5Typography>

                    <Spacer />
                    <ExtendingButton variant="filled" color="primary">
                        <div style={{ width: "1.5rem" }} />
                        <ButtonTypography>
                            Start Customizing
                        </ButtonTypography>
                        <div className="former" />
                        <ButtonTypography>{">"}</ButtonTypography>
                        <div className="latter" />
                    </ExtendingButton>
                    <Spacer />

                </CenteredSpacedDiv>

                {/* <QuoteTypography color="secondary" style={{ textWrap: "balance", fontSize: "1.1rem" }}>
                    <i>
                        Nostalgia is a collection of <b>SVG patterns and backgrounds</b>, available via <b>HTTP endpoints</b>, designed for easy integration into projects.
                        Use them to add unique visuals to <b>GitHub READMEs, websites, and more</b> by simply embedding the provided URLs.
                        <span style={{ textAlign: "right", display: "block" }}>
                            -- Nostalgia.Z
                        </span>

                        <br /><br />

                        Zane, Once an architect of spaces, now a sculptor of code. <br />
                        From moments where memory and creativity collide, logic and beauty dance. <br />
                        <span style={{ textAlign: "right", display: "block" }}>
                            -- Zane
                        </span>
                    </i>
                </QuoteTypography> */}
            </Panel>
        ]
    )
}