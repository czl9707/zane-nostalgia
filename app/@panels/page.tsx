import { css, styled } from "@pigment-css/react";
import Panel from "../components/ui/panel";
import { H2Typography, H4Typography, H5Typography, BodyTypography } from "../components/ui/typography";
import ButtonLink from "../components/ui/button-link";
import TypingTypography from "./typing-typography";
import { Animation, Code, Tune } from "../components/ui/icons/icons";

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

function HeroPanel() {
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
                    <br /><br />
                </H5Typography>

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

const bullets = [
    {
        title: "Dynamic SVGs",
        content: "SVGs with animated effects. Add movement and depth to your backgrounds.",
        Icon: Animation,
    },
    {
        title: "Customizable Patterns",
        content: "Size, Color, Geometry, even Seeds. Customization never ends until until you're satisfied.",
        Icon: Tune,
    },
    {
        title: "Multiple Integration Options",
        content: "Download, Copy, or Embed. Choose the best integration option suits your workflow.",
        Icon: Code,
    }
]

function BulletPanel() {
    return (
        <div className={css(({ theme }) => ({
            [`@media(min-width: ${theme.breakpoints.lg})`]: {
                gridTemplateColumns: `repeat(3, 1fr)`,
            },
            [`@media(max-width: ${theme.breakpoints.lg})`]: {
                gridTemplateColumns: `repeat(1, 1fr)`,
            },
            display: "grid",
            alignItems: "stretch", justifyContent: "space-between",
            gap: theme.padding.panel
        }))} key={"Bullets"}>
            {
                bullets.map(({ title, content, Icon }) => {
                    return (
                        <Panel style={{ flex: "1 1" }} key={title}>
                            <div style={{ display: "inline-flex", alignItems: "center", marginBottom: ".3rem" }}>
                                <Icon style={{ marginRight: "1rem" }} />
                                <H4Typography>{title}</H4Typography>
                            </div>
                            <BodyTypography color="secondary" >
                                {content}
                            </BodyTypography>
                        </Panel>
                    )
                })
            }
        </div>
    )
}


export default function HomePanels() {
    return (
        [
            <HeroPanel key="Hero" />,
            <BulletPanel key="Bullet" />
        ]
    )
}