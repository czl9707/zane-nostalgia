import { styled } from "@pigment-css/react"
import Panel from "../components/ui/panel"
import { BodyTypography, H4Typography } from "../components/ui/typography"
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
    gap: theme.padding.panel,
}));


export default function UseCasePanel() {
    return (
        <>
            <UseCaseContainer>
                <Panel color="transparent">
                    <div style={{ display: "inline-flex", alignItems: "center", marginBottom: ".3rem", gap: "1rem" }}>
                        <Download />
                        <H4Typography>Download as you want</H4Typography>
                    </div>
                    <BodyTypography color="secondary" >
                        asd fha sdjhfao iub vijnl aksj dhfiau
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
                        <H4Typography>Copy as you want</H4Typography>
                    </div>
                    <BodyTypography color="secondary" >
                        asd fha sdjhfao iub vijnl aksj dhfiau
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
                        <H4Typography>Embed as you want</H4Typography>
                    </div>
                    <BodyTypography color="secondary" >
                        asd fha sdjhfao iub vijnl aksj dhfiau
                    </BodyTypography>
                </Panel>
                <Panel >
                    2133
                </Panel>
            </UseCaseContainer>
        </>
    )
}