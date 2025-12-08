// import { css, styled } from "@pigment-css/react";
// import { Scene } from "@/scene-components/utils/types";
// import * as T from "@/components/ui/typography";
// import Link from "next/link";
// import ShowcasePanelShadowWrapper, { ShowCaseSceneTypes } from "./showcase-panel-shadow-wrapper";


// const ShowcaseContainer = styled('div')(({ theme }) => ({
//     alignItems: "stretch", display: "flex", gap: ".5rem",
//     [`@media(min-width: ${theme.breakpoint.lg})`]: {
//         width: "100%", height: "25vw", flexDirection: "row",
//     },
//     [`@media(max-width: ${theme.breakpoint.lg})`]: {
//         width: "100%", height: "100vw", flexDirection: "column",
//     },
// }));

// const ShowCaseViewBox = styled('div')(({ theme }) => ({
//     transition: `flex ${theme.transition.long} ease-out`,
//     position: "relative", overflow: "hidden",
//     flex: "1 1", display: "flex",

//     [`@media(min-width: ${theme.breakpoint.lg})`]: {
//         flexDirection: "column",
//         "& div": { height: "100%" },
//     },
//     [`@media(max-width: ${theme.breakpoint.lg})`]: {
//         flexDirection: "row",
//         "& div": { width: "100%" },
//     },

//     [`${ShowCaseMask}`]: {
//         opacity: 0,
//         transition: `opacity ${theme.transition.short} ease-out`,
//     },
//     "&:hover": {
//         [`${ShowCaseMask}`]: {
//             opacity: .8,
//             transition: `opacity ${theme.transition.long} ease-out ${theme.transition.short}`,
//         },
//         flex: "5 5",
//     }
// }))

// const ShowCaseMask = styled('div')(({ theme }) => ({
//     position: "absolute", inset: 0, boxSizing: "border-box",
//     backgroundImage: `linear-gradient(0deg, grey -200%, transparent 50%)`,
//     display: "flex", gap: "1rem",
//     justifyContent: "center", alignItems: "flex-end",
//     paddingBottom: "1rem", color: `rgb(${theme.vars.colors.primary.contrastText})`
// }));


// async function ShowCase({ scene, ...other }: {
//     scene: ShowCaseSceneTypes,
//     [key: string]: string
// }) {
//     const sceneModule: Scene.ComponentMetaModule = await import(`../../scene-components/${scene}.meta`);

//     return (
//         <ShowCaseViewBox>
//             <ShowcasePanelShadowWrapper scene={scene} {...other} />
//             <Link href={`/scenes/${scene}`}>
//                 <ShowCaseMask>
//                     <sceneModule.Icon />
//                     <T.H5>{sceneModule.name}</T.H5>
//                 </ShowCaseMask>
//             </Link>
//         </ShowCaseViewBox >
//     )
// }


// export default function ShowCasePanel() {
//     return (
//         <div style={{
//             position: "relative", padding: "12rem 0"
//         }}>
//             <div className={css(({ theme }) => ({
//                 position: "absolute", left: "-100vw", right: `calc(-1 * ${theme.padding.thread})`,
//                 top: "-12rem", bottom: "-12rem", zIndex: "-1",
//                 backgroundImage: `linear-gradient(0deg,
//                         transparent 0%, 
//                         rgb(${theme.vars.colors.primary.background}) 15%,
//                         rgb(${theme.vars.colors.primary.background}) 85%,
//                         transparent 100%
//                     )`,
//             }))} />

//             <T.H3 style={{ textWrap: "balance" }} color="primary">
//                 Increasing Number of SVG Generators
//                 <br /><br />
//             </T.H3>
//             <ShowcaseContainer>
//                 <ShowCase scene="meteors" backgroundColor="#040404" color="#AAAAAA" />
//                 <ShowCase scene="rainy" backgroundColor="#040404" color="#AAAAAA" />
//                 <ShowCase scene="waves" backgroundColor="#040404" color="#AAAAAA" />
//                 <ShowCase scene="404" backgroundColor="#040404" color="#AAAAAA" />
//                 <ShowCase scene="noise" backgroundColor="#040404" color="#1F1F1F" />
//                 <ShowCase scene="beats" backgroundColor="#040404" color="#333333" />
//                 <ShowCase scene="cubes" backgroundColor="#040404" color="#222222" />
//             </ShowcaseContainer>

//             <div style={{ height: "6rem" }} />

//             <T.H3 style={{ textWrap: "balance" }} color="primary">
//                 Its All About Customization
//                 <br /><br />
//             </T.H3>
//             <ShowcaseContainer>
//                 <ShowCase scene="meteors" backgroundColor="#7a0606" color="#000000" rotation="90" density="20" />
//                 <ShowCase scene="meteors" backgroundColor="#b8eaff" color="#c5baba" rotation="120" density="20" />
//                 <ShowCase scene="meteors" backgroundColor="#051829" color="#8c8c8c" rotation="60" density="20" />
//                 <ShowCase scene="meteors" backgroundColor="#a975a2" color="#ffffff" rotation="70" density="20" />
//                 <ShowCase scene="meteors" backgroundColor="#040404" color="#FFFFFF" rotation="0" density="20" />
//                 <ShowCase scene="meteors" backgroundColor="#290505" color="#ff0000" rotation="150" density="20" />
//                 <ShowCase scene="meteors" backgroundColor="#050525" color="#FFFF00" rotation="60" density="15" />
//             </ShowcaseContainer>
//         </div >
//     )
// }