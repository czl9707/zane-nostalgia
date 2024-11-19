import { styled, css, keyframes } from "@pigment-css/react"
import Panel from "../components/ui/panel"
import { BodyTypography, H3Typography, H4Typography } from "../components/ui/typography"
import { Download, Copy, Code, File, BackHand } from "../components/ui/icons/icons";

import { Component as MeteorsScene, meta as meteorsMeta } from "../scene-components/meteors";
import { Component as FourOFour, meta as fourOfourMeta } from "../scene-components/404";
import { defaultParameterResolver } from "../scene-components/utils/resolver";
import TypingTypography from "../components/ui/typing-typography";

interface UseCaseContainer {
    reverse?: boolean
}
const UseCaseContainer = styled("div")<UseCaseContainer>(({ theme }) => ({
    [`@media(min-width: ${theme.breakpoints.lg})`]: {
        flexDirection: ({ reverse = false }) => reverse ? "row-reverse" : "row",
        alignItems: "center", justifyContent: "space-between",
    },
    [`@media(max-width: ${theme.breakpoints.lg})`]: {
        flexDirection: "column", alignItems: "stretch",
    },
    "&>div:nth-child(1)": {
        flex: "1 1"
    },
    "&>div:nth-child(2)": {
        flex: "2 2"
    },
    display: "flex",
    gap: theme.padding.panel, padding: "0 0 3rem 0"
}));


export default function UseCasePanel() {
    return (
        <>
            <div>
                <H3Typography style={{ textWrap: "balance" }} color="primary">
                    Increasing Number of SVG Generators
                    <br /><br />
                </H3Typography>
            </div>
            <UseCaseContainer>
                <Panel color="transparent">
                    <div style={{ display: "inline-flex", alignItems: "center", marginBottom: ".5rem", gap: "1rem" }}>
                        <Download />
                        <H4Typography>Download for Quick Start</H4Typography>
                    </div>
                    <BodyTypography color="secondary" >
                        Whether you&apos;re crafting sleek UI designs, building presentation decks, or creating engaging social media posts, downloading patterns as file, keep it static in hand would be the most native way.
                    </BodyTypography>
                </Panel>
                <DownloadIllustration />
            </UseCaseContainer>
            <UseCaseContainer reverse>
                <Panel color="transparent">
                    <div style={{ display: "inline-flex", alignItems: "center", marginBottom: ".3rem", gap: "1rem" }}>
                        <Copy />
                        <H4Typography>Copy for Maximum Customization</H4Typography>
                    </div>
                    <BodyTypography color="secondary" >
                        Looking to tweak the pattern to perfection? Copy the raw SVG code and customize every detail to match your vision. Modify colors, adjust shapes, or add animations to make it uniquely yours.
                    </BodyTypography>
                </Panel>
                <CopyIllustration />
            </UseCaseContainer>
            <UseCaseContainer>
                <Panel color="transparent">
                    <div style={{ display: "inline-flex", alignItems: "center", marginBottom: ".3rem", gap: "1rem" }}>
                        <Code />
                        <H4Typography>Embed for Effortless Integration</H4Typography>
                    </div>
                    <BodyTypography color="secondary" >
                        Need visually stunning backgrounds or patterns to your GitHub README, documentation, or live projects? And wanna avoid huge chunk of svg text checked in? Take the HTTP endpoint and embed to integrate dynamic visuals without managing files.
                    </BodyTypography>
                </Panel>
                <EmbedIllustration />
            </UseCaseContainer>
        </>
    )
}

// Mock Util
const MockContainer = styled("div")(({ theme }) => ({
    [`@media(min-width: ${theme.breakpoints.lg})`]: { height: "30vw", },
    [`@media(max-width: ${theme.breakpoints.lg})`]: { height: "45vw", },
    width: "60%", background: "#333333", overflow: "hidden", position: "relative",
}));
const LinePlaceHolder = styled("span")({
    backgroundColor: "#202020", height: "1.4rem", maxWidth: "100%", boxSizing: "border-box",
    margin: ".3rem 1rem", display: "block"
})
const ScenePlaceHolder = styled("div")({
    backgroundColor: "#202020", height: "60%", width: "100%", overflow: "hidden", position: "relative",
})


// Download Intro illustration
const downloadingFiles = keyframes({
    "0%": { transform: "translateY(-20%)", opacity: 0 },
    "10%": { transform: "none", opacity: 1 },
    "100%": { transform: "none", opacity: 1 }
});
const droppingFiles = keyframes({
    "0%": { transform: "none", opacity: 0 },
    "20%": { transform: "none", opacity: 0 },
    "21%": { transform: "none", opacity: 1 },
    "30%": { transform: "translateX(135%)", opacity: 1 },
    "33%": { transform: "translateX(135%) scale(1.2)", opacity: 0 },
    "100%": { transform: "translateX(135%) scale(1.2)", opacity: 0 }
});
const sceneDropped = keyframes({
    "0%": { opacity: 0 }, "35%": { opacity: 0 },
    "40%": { opacity: 1 }, "85%": { opacity: 1 },
    "90%": { opacity: 0 }, "100%": { opacity: 0 },
});


function DownloadIllustration() {
    const animateDetail = '9s linear infinite forwards';

    const FileIconNName = ({ animation, hasHand = false }: { animation: string, hasHand?: boolean }) => (
        <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            position: "absolute", inset: 0, zIndex: 1, animation: animation,
        }}>
            <File size="2.5rem" style={{ opacity: hasHand ? .6 : 1 }} />
            <BodyTypography>Meteors.svg</BodyTypography>
            {
                hasHand &&
                <div style={{ height: 0, overflow: "visible", }}>
                    <BackHand style={{ color: "white", transform: "translate(50%, -150%)" }} />
                </div>
            }
        </div>
    );

    return (
        <Panel className={css(({ theme }) => ({ display: "flex", alignItems: "stretch", gap: theme.padding.panel }))}>
            <div style={{ width: "40%", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <FileIconNName hasHand animation={`${droppingFiles} ${animateDetail}`} />
                <FileIconNName animation={`${downloadingFiles} ${animateDetail}`} />
            </div>
            <MockContainer>
                <ScenePlaceHolder >
                    <svg viewBox={`0 0 1200 600`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
                        style={{ animation: `${sceneDropped} ${animateDetail}` }}>
                        <MeteorsScene {...defaultParameterResolver({}, meteorsMeta)} banner="" width={1200} height={600} />
                    </svg>
                </ScenePlaceHolder>
                <LinePlaceHolder style={{ width: 0 }} />

                <LinePlaceHolder />
                <LinePlaceHolder style={{ width: "65%", }} />

                <LinePlaceHolder style={{ width: 0 }} />

                <LinePlaceHolder />
                <LinePlaceHolder />
                <LinePlaceHolder style={{ width: "40%", }} />

                <LinePlaceHolder style={{ width: 0 }} />

                <LinePlaceHolder />
                <LinePlaceHolder />
                <LinePlaceHolder />
                <LinePlaceHolder />
                <LinePlaceHolder />
                <LinePlaceHolder />
            </MockContainer>
        </Panel>
    )
}

// Copy Intro illustration
const originalScene = keyframes({
    "0%": { opacity: 0 }, "10%": { opacity: 1 }, "40%": { opacity: 1 },
    "50%": { opacity: 0 }, "100%": { opacity: 0 },
});
const updatedScene = keyframes({
    "0%": { opacity: 0 }, "50%": { opacity: 0 },
    "60%": { opacity: 1 }, "90%": { opacity: 1 }, "100%": { opacity: 0 },
});

const CodingPad = styled("div")(({ theme }) => ({
    position: "relative", width: "100%",
    padding: "1rem", boxSizing: "border-box", overflow: "hidden",
    borderRadius: ".5rem", border: `1px solid ${theme.vars.colors.secondary.contrastText}`,
    background: `color-mix(in srgb, ${theme.vars.colors.primary.background}, transparent)`,
}));

function CopyIllustration() {
    const animateDetail = '8.7s linear infinite forwards';

    return (
        <Panel className={css(({ theme }) => ({ display: "flex", alignItems: "stretch", gap: theme.padding.panel }))}>
            <div style={{ width: "40%", position: "relative", display: "flex", alignItems: "center" }}>
                <CodingPad>
                    <BodyTypography color="secondary" style={{ opacity: "0.5", margin: ".3rem 1rem" }}>
                        // FancyText.svg
                    </BodyTypography>
                    <LinePlaceHolder style={{ marginRight: "20%" }} />
                    <LinePlaceHolder style={{ marginLeft: "10%", marginRight: "20%" }} />
                    <div style={{ display: "flex", alignItems: "center", margin: "-.3rem 0", marginLeft: "15%" }}>
                        <LinePlaceHolder style={{ width: "10%" }} />
                        <BodyTypography color="secondary" >
                            <TypingTypography contents={["Zane", "Kiyo"]} />
                        </BodyTypography>
                        <LinePlaceHolder style={{ flex: "1 1" }} />
                    </div>
                    <LinePlaceHolder style={{ marginLeft: "10%", marginRight: "30%" }} />
                    <LinePlaceHolder style={{ marginLeft: "10%", marginRight: "20%" }} />

                    <LinePlaceHolder style={{ marginRight: "20%" }} />
                </CodingPad>
            </div>
            <MockContainer>
                <ScenePlaceHolder >
                    <svg viewBox={`0 0 1200 600`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
                        style={{ animation: `${originalScene} ${animateDetail}`, position: "absolute", inset: "0 0 auto 0" }}>
                        <FourOFour {...defaultParameterResolver({ color: "#080877" }, fourOfourMeta)} banner="" width={1200} height={600} content="Zane" />
                    </svg>
                    <svg viewBox={`0 0 1200 600`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
                        style={{ animation: `${updatedScene} ${animateDetail}`, position: "absolute", inset: "0 0 auto 0" }}>
                        <FourOFour {...defaultParameterResolver({ color: "#080877" }, fourOfourMeta)} banner="" width={1200} height={600} content="Kiyo" />
                    </svg>
                </ScenePlaceHolder>
                <LinePlaceHolder style={{ width: 0 }} />

                <LinePlaceHolder />
                <LinePlaceHolder />
                <LinePlaceHolder style={{ width: "25%", }} />

                <LinePlaceHolder style={{ width: 0 }} />

                <LinePlaceHolder />
                <LinePlaceHolder style={{ width: "50%", }} />

                <LinePlaceHolder style={{ width: 0 }} />

                <LinePlaceHolder />
                <LinePlaceHolder />
                <LinePlaceHolder />
                <LinePlaceHolder />
                <LinePlaceHolder />
                <LinePlaceHolder />
            </MockContainer>
        </Panel>
    )
}


// Embed Intro illustration

function EmbedIllustration() {
    const animateDetail = '8.7s linear infinite forwards';

    return (
        <Panel className={css(({ theme }) => ({ display: "flex", alignItems: "stretch", gap: theme.padding.panel }))}>
            <div style={{ width: "40%", position: "relative", display: "flex", alignItems: "center" }}>
                <BodyTypography color="secondary" >
                    Under Construction
                </BodyTypography>
            </div>
            <MockContainer>
                <ScenePlaceHolder >
                    <svg viewBox={`0 0 1200 600`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
                        <MeteorsScene {...defaultParameterResolver({}, meteorsMeta)} banner="" width={1200} height={600} />
                    </svg>
                </ScenePlaceHolder>
                <LinePlaceHolder style={{ width: 0 }} />

                <LinePlaceHolder />
                <LinePlaceHolder />
                <LinePlaceHolder style={{ width: "25%", }} />

                <LinePlaceHolder style={{ width: 0 }} />

                <LinePlaceHolder />
                <LinePlaceHolder style={{ width: "50%", }} />

                <LinePlaceHolder style={{ width: 0 }} />

                <LinePlaceHolder />
                <LinePlaceHolder />
                <LinePlaceHolder />
                <LinePlaceHolder />
                <LinePlaceHolder />
                <LinePlaceHolder />
            </MockContainer>
        </Panel>
    )
}
