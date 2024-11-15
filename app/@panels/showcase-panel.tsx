import { css, styled } from "@pigment-css/react";
import { defaultParameterResolver } from "../scene-components/utils/resolver";
import { SceneModule } from "../scene-components/utils/types";
import { H3Typography, H5Typography } from "../components/ui/typography";
import Link from "next/link";


const Spacer = () => <div style={{ height: "3rem" }} />;

const ShowcaseContainer = styled('div')(({ theme }) => ({
    width: "100%", height: "25vw", alignItems: "stretch",
    display: "flex", flexDirection: "row", gap: ".5rem",
}))

const ShowCaseViewBox = styled('div')(({ theme }) => ({
    transition: `flex ${theme.transition.long} ease-out`,
    position: "relative",
    flex: "1 1",
    [`${ShowCaseMask}`]: {
        opacity: 0,
        transition: `opacity ${theme.transition.short} ease-out`,
    },
    "&:hover": {
        [`${ShowCaseMask}`]: {
            opacity: .8,
            transition: `opacity ${theme.transition.long} ease-out ${theme.transition.short}`,
        },
        flex: "5 5",
    }
}))

const ShowCaseMask = styled('div')(({ theme }) => ({
    position: "absolute", inset: 0,
    backgroundImage: `linear-gradient(0deg, grey -200%, transparent 50%)`,
    display: "flex", gap: "1rem",
    justifyContent: "center", alignItems: "flex-end",
    paddingBottom: "1rem",
}))


async function ShowCase({ scene, ...other }: {
    scene: string,
    [key: string]: string
}) {
    const sceneModule: SceneModule = await import(`../scene-components/${scene}`);
    const sceneParams = defaultParameterResolver(other, sceneModule.meta);

    return (
        <ShowCaseViewBox>
            <svg viewBox={`0 0 600 1200`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
                <sceneModule.SceneComponent width={600} height={1200} {...sceneParams} />
            </svg>
            <Link href={`/scenes/${scene}`}>
                <ShowCaseMask>
                    <sceneModule.SceneIcon />
                    <H5Typography color="primary">{sceneModule.name}</H5Typography>
                </ShowCaseMask>
            </Link>
        </ShowCaseViewBox >
    )
}


export default function ShowCasePanel() {
    return (
        <>
            <div style={{
                position: "relative", padding: "0 0 12rem 0"
            }}>
                <div className={css(({ theme }) => ({
                    position: "absolute", left: "-100vw", right: `calc(-1 * ${theme.padding.thread})`,
                    top: 0, bottom: 0, zIndex: "-1",
                    backgroundImage: `linear-gradient(0deg,
                        transparent 0%, 
                        ${theme.vars.colors.primary.background} 15%,
                        ${theme.vars.colors.primary.background} 85%,
                        transparent 100%
                    )`,
                }))} />
                <Spacer />
                <Spacer />
                <H3Typography style={{ textWrap: "balance" }} color="primary">
                    Increasing Number of SVG Generators
                    <br /><br />
                </H3Typography>
                <ShowcaseContainer>
                    <ShowCase scene="meteors" backgroundColor="#080808" />
                    <ShowCase scene="rainy" backgroundColor="#080808" />
                    <ShowCase scene="waves" backgroundColor="#080808" />
                    <ShowCase scene="404" backgroundColor="#080808" />
                    <ShowCase scene="meteors" backgroundColor="#080808" />
                    <ShowCase scene="rainy" backgroundColor="#080808" />
                    <ShowCase scene="waves" backgroundColor="#080808" />
                </ShowcaseContainer>
                <Spacer />
                <Spacer />
                <H3Typography style={{ textWrap: "balance" }} color="primary">
                    Its All About Customization
                    <br /><br />
                </H3Typography>
                <ShowcaseContainer>
                    <ShowCase scene="meteors" backgroundColor="#080808" />
                    <ShowCase scene="meteors" backgroundColor="#080808" />
                    <ShowCase scene="meteors" backgroundColor="#080808" />
                    <ShowCase scene="meteors" backgroundColor="#080808" />
                    <ShowCase scene="meteors" backgroundColor="#080808" />
                    <ShowCase scene="meteors" backgroundColor="#080808" />
                    <ShowCase scene="meteors" backgroundColor="#080808" />
                </ShowcaseContainer>
                <Spacer />
                <Spacer />
            </div >
        </>
    )
}