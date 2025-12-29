"use client"
import * as React from 'react';
import { styled, css, keyframes } from "@pigment-css/react";

import Panel from "@/components/ui/panel";
import * as T from "@/components/ui/typography"
import { Download, Copy, Code, File, BackHand } from "@/components/ui/icons/icons";

import { meteorModule } from "@/scene-components/meteors";
import { fourOFourModule } from "@/scene-components/404";
import { noiseModule } from "@/scene-components/noise";

interface UseCaseContainer {
    reverse?: boolean
}
const UseCaseContainer = styled("div")<UseCaseContainer>(({ theme }) => ({
    [`@media(min-width: ${theme.breakpoint.lg})`]: {
        flexDirection: ({ reverse = false }) => reverse ? "row-reverse" : "row",
        alignItems: "center", justifyContent: "space-between",
    },
    [`@media(max-width: ${theme.breakpoint.lg})`]: {
        flexDirection: "column", alignItems: "stretch",
    },
    "&>div:nth-child(1)": {
        flex: "1 1",
    },
    "&>div:nth-child(2)": {
        flex: "2 2",
    },
    display: "flex",
    gap: theme.padding.panel, padding: "0 0 3rem 0"
}));


export default function UseCasePanel() {
    return (
        <>
            <div>
                <T.H3 style={{ textWrap: "balance" }} color="primary">
                    Multiple Integration Options
                    <br /><br />
                </T.H3>
            </div>
            <UseCaseContainer>
                <Panel color="transparent">
                    <div style={{ display: "inline-flex", alignItems: "center", marginBottom: ".3rem", gap: "1rem" }}>
                        <Code />
                        <T.H4>Embed for Effortless Integration</T.H4>
                    </div>
                    <T.Body color="secondary" >
                        Need visually stunning backgrounds or patterns to your <b>GitHub README, documentation, or live projects</b>?
                        And wanna avoid huge chunk of svg text checked in? Take the <b>HTTP endpoint</b> and embed to integrate dynamic visuals without managing files.
                        We also provide an option to inclue a <b>banner</b>, perfect for headers or contextual visuals that stand out.
                    </T.Body>
                </Panel>
                <EmbedIllustration />
            </UseCaseContainer>
            <UseCaseContainer reverse>
                <Panel color="transparent">
                    <div style={{ display: "inline-flex", alignItems: "center", marginBottom: ".5rem", gap: "1rem" }}>
                        <Download />
                        <T.H4>Download for Quick Start</T.H4>
                    </div>
                    <T.Body color="secondary" >
                        Whether you&apos;re crafting sleek UI designs, building presentation decks, or creating engaging social media posts, downloading patterns as file,
                        keep it static in hand would be the most native way.
                    </T.Body>
                </Panel>
                <DownloadIllustration />
            </UseCaseContainer>
            <UseCaseContainer >
                <Panel color="transparent">
                    <div style={{ display: "inline-flex", alignItems: "center", marginBottom: ".3rem", gap: "1rem" }}>
                        <Copy />
                        <T.H4>Copy for Maximum Customization</T.H4>
                    </div>
                    <T.Body color="secondary" >
                        Developer looking to tweak the pattern to perfection? Copy the raw SVG code and customize every detail to match your vision.
                        Modify fonts, adjust shapes, or add animations to make it uniquely yours.
                    </T.Body>
                </Panel>
                <CopyIllustration />
            </UseCaseContainer>
        </>
    )
}

// Embed Intro illustration
const CodingPad = styled("div")(({ theme }) => ({
    position: "relative", width: "100%", lineBreak: "anywhere", maxHeight: "15rem",
    padding: "1rem", boxSizing: "border-box", overflowY: "scroll",
    borderRadius: ".5rem", border: `1px solid rgb(${theme.vars.colors.secondary.contrastText})`,
    background: `rgb(${theme.vars.colors.primary.background} / 50%)`,
}));

function EmbedIllustration() {
    return (
        <Panel className={css(({ theme }) => ({ display: "flex", flexDirection: "column", alignItems: "stretch", gap: theme.padding.panel }))}>
            <T.H5 style={{ textAlign: 'center' }}>
                The only line of Code you need:
            </T.H5>
            <div className={css(({ theme }) => ({
                display: "flex", gap: theme.padding.panel,
                alignItems: "stretch",
            }))}>
                <CodingPad>
                    <T.Body color="secondary" style={{ opacity: .7 }}><i>{"// my_blog.html"}</i></T.Body>
                    <T.Body color="secondary">
                        <br />
                        {`<img src="https://zane-nostalgia.kiyo-n-zane.com/scenes/meteors/api?width=2000&height=400&bannerText=Hello%2C+I+am+Zane%21" alt="Hello, I am Zane!"/>`}
                    </T.Body>
                </CodingPad>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <T.Body>Or</T.Body>
                </div>
                <CodingPad>
                    <T.Body color="secondary" style={{ opacity: .7 }}><i>{"// README.md"}</i></T.Body>
                    <T.Body color="secondary">
                        <br />
                        {`![Hello, I am Zane!](https://zane-nostalgia.kiyo-n-zane.com/scenes/meteors/api?width=2000&height=400&bannerText=Hello%2C+I+am+Zane%21)`}
                    </T.Body>
                </CodingPad>
            </div>
            <T.H5 style={{ textAlign: 'center' }}>
                The stunning header svg image you get:
            </T.H5>
            <svg viewBox={`0 0 2000 400`} width="100%" preserveAspectRatio="xMidYMid slice">
                <noiseModule.Component width={2000} height={400} bannerText="Hello, I am Zane!" />
            </svg>
        </Panel>
    )
}


// Mock Util
const MockContainer = styled("div")(({ theme }) => ({
    [`@media(min-width: ${theme.breakpoint.lg})`]: { height: "30vw", },
    [`@media(max-width: ${theme.breakpoint.lg})`]: { height: "45vw", },
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
            <T.Body>Meteors.svg</T.Body>
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
                        <meteorModule.Component width={1200} height={600} />
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

function CopyIllustration() {
    return (
        <Panel className={css(({ theme }) => ({
            display: "flex", alignItems: "stretch", gap: theme.padding.panel,
            "&>div": {
                display: "flex", flexDirection: "column", gap: theme.padding.panel,
                width: `calc((100% - ${theme.padding.panel}) / 2)`, flex: "1 0",
            },
            "&>div>div:nth-child(1)": {
                height: "30%", overflow: "visible",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "1rem", boxSizing: "border-box", zIndex: 1,
            },
            "&>div>:nth-child(2)": {
                flex: "3 3"
            },
        }))}>
            <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');` }} />
            <div>
                <div>
                    <T.H5 style={{ textAlign: 'center', }}>
                        Raw SVG string copied from Web App
                    </T.H5>
                </div>
                <svg viewBox={`0 0 1200 1200`} width="100%" preserveAspectRatio="xMidYMid slice">
                    <fourOFourModule.Component width={1200} height={1200} />
                </svg>
            </div>
            <div>
                <div>
                    <T.H5 style={{ textAlign: 'center' }}>
                        Adjust fonts, shapes and etc...
                        <br />
                        Customize everything and make it unique.
                    </T.H5>
                </div>
                <svg viewBox={`0 0 1200 1200`} width="100%" preserveAspectRatio="xMidYMid slice" id="customized-svg"
                    className={css({ "& text": { transform: "rotate(-30deg) scale(2,2)", fontFamily: "'Pacifico' !important" } })}>
                    <fourOFourModule.Component width={1200} height={1200} color="#ffff0088" textContent="Kiyo" />
                </svg>
            </div>
        </Panel>
    )
}


