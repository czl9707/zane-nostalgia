import { css, styled } from "@pigment-css/react";
import { defaultParameterResolver } from "../scene-components/utils/resolver";
import { SceneModule } from "../scene-components/utils/types";
import { H3Typography, H5Typography } from "../components/ui/typography";
import Link from "next/link";


const Spacer = () => <div style={{ height: "3rem" }} />;

const ShowCaseViewBox = styled('div')(({ theme }) => ({
    transition: `all ${theme.transition.long} linear`,
    position: "relative",

    [`${ShowCaseMask}`]: {
        opacity: 0,
    },
    "&:hover": {
        boxShadow: `0 0 5px color-mix(in srgb, ${theme.vars.colors.secondary.contrastText} 30%, transparent)`,
        [`${ShowCaseMask}`]: {
            opacity: .8,
        },
    }
}))

const ShowCaseMask = styled('div')(({ theme }) => ({
    position: "absolute", inset: 0,
    backgroundImage: `linear-gradient(0deg, ${theme.vars.colors.secondary.contrastText} -200%, transparent 50%)`,
    transition: `all ${theme.transition.long} linear`,
    display: "flex", gap: "1rem",
    justifyContent: "center", alignItems: "flex-end",
    paddingBottom: "1rem"
}))


async function ShowCaseBox({ size, scene }: {
    size: "sm" | "lg",
    scene: string,
}) {
    const sceneModule: SceneModule = await import(`../scene-components/${scene}`);
    const sceneParams = defaultParameterResolver({}, sceneModule.meta);

    return (
        <Link href={`/scenes/${scene}`}>
            <ShowCaseViewBox>
                <svg viewBox={`0 0 800 ${size === "sm" ? 600 : 1000}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
                    <sceneModule.SceneComponent width={800} height={size === "sm" ? 600 : 1000} {...sceneParams} />
                </svg>
                <ShowCaseMask>
                    <sceneModule.SceneIcon />
                    <H5Typography color="primary">{sceneModule.name}</H5Typography>
                </ShowCaseMask>
            </ShowCaseViewBox >
        </Link>
    )
}

const ShowcaseContainer = styled('div')(({ theme }) => ({
    width: "100%", display: "flex", flexDirection: "column", gap: theme.padding.panel
}))

export default function ShowCasePanel() {
    return (
        <div>
            <Spacer />
            <Spacer />
            <H3Typography style={{ textWrap: "balance" }} color="primary">
                Growing Number of SVG Generators
                <br /><br />
            </H3Typography>
            <div className={css(({ theme }) => ({
                gridTemplateColumns: `repeat(3, 1fr)`,
                display: "grid", width: "100%",
                alignItems: "stretch", justifyContent: "space-between",
                gap: theme.padding.panel
            }))}>
                <ShowcaseContainer>
                    <ShowCaseBox size="lg" scene="meteors" />
                    <ShowCaseBox size="sm" scene="rainy" />
                </ShowcaseContainer>
                <ShowcaseContainer>
                    <ShowCaseBox size="sm" scene="rainy" />
                    <ShowCaseBox size="lg" scene="meteors" />
                </ShowcaseContainer>
                <ShowcaseContainer>
                    <ShowCaseBox size="lg" scene="meteors" />
                    <ShowCaseBox size="sm" scene="rainy" />
                </ShowcaseContainer>
            </div>
        </div>
    )
}