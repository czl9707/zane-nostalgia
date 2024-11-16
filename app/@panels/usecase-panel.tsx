import { styled } from "@pigment-css/react"
import Panel from "../components/ui/panel"
import { BodyTypography, H3Typography, H4Typography } from "../components/ui/typography"
import { Download, Copy, Code } from "../components/ui/icons/icons";

interface UseCaseContainer {
    reverse?: boolean
}
const UseCaseContainer = styled("div")<UseCaseContainer>(({ theme }) => ({
    [`@media(min-width: ${theme.breakpoints.lg})`]: {
        flexDirection: ({ reverse = false }) => reverse ? "row-reverse" : "row",
    },
    [`@media(max-width: ${theme.breakpoints.lg})`]: {
        flexDirection: "column",
    },
    "div:nth-child(1)": {
        flex: "1 1"
    },
    "div:nth-child(2)": {
        flex: "2 2"
    },
    display: "flex",
    alignItems: "stretch", justifyContent: "space-between",
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
                <Panel >
                    2133
                </Panel>
            </UseCaseContainer>
            <UseCaseContainer reverse>
                <Panel color="transparent">
                    <div style={{ display: "inline-flex", alignItems: "center", marginBottom: ".3rem", gap: "1rem" }}>
                        <Copy />
                        <H4Typography>Copy for Maximum Customization</H4Typography>
                    </div>
                    <BodyTypography color="secondary" >
                        Looking to tweak the pattern to perfection? Copy the raw SVG code and customize every detail to match your vision. Modify colors, adjust shapes, or add animations to make it uniquely yours
                    </BodyTypography>
                </Panel>
                <Panel >
                    2133
                </Panel>
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
                <Panel >
                    2133
                </Panel>
            </UseCaseContainer>
        </>
    )
}