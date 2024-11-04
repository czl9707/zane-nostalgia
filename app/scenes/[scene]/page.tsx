import { defaultSceneSizeMetaData } from "@/app/scene-components/utils/constants";
import { fetchScene, fetchSceneMetas } from "@/app/scene-components/utils/fetch-scenes";
import { defaultParameterResolver, defaultSizeParameterResolver, resolveParameterConstraints } from "@/app/scene-components/utils/resolver";
import { SceneModule } from "@/app/scene-components/utils/types";
import { styled } from "@pigment-css/react";


export async function generateStaticParams(): Promise<{ scene: string }[]> {
    const scenes = await fetchSceneMetas();
    return scenes.map(s => ({ scene: s.route }));
}

const SVGContainer = styled('svg')(({ theme }) => ({
    position: "fixed", left: "50%", top: "50%",
    transform: "translate(-50%, -50%)",
    transition: `all ${theme.transition.short} linear`,
    boxSizing: "content-box",
}))

export default async function Page({ params, searchParams }: { params: { scene: string }, searchParams: { [key: string]: string } }) {
    const sceneModule: SceneModule = await fetchScene(params.scene);
    const SceneComponent = sceneModule.SceneComponent;

    const resolvedParam = defaultParameterResolver(searchParams, sceneModule.meta);
    const resolvedSizeParam = defaultSizeParameterResolver(searchParams);
    const resolved = resolveParameterConstraints({ ...resolvedParam, ...resolvedSizeParam }, { ...sceneModule.meta, ...defaultSceneSizeMetaData });

    return (
        <SVGContainer viewBox={`0 0 ${resolvedSizeParam.width} ${resolvedSizeParam.height}`} height="96%" width="96%" preserveAspectRatio="xMidYMid meet">
            <SceneComponent {...resolved} />
        </SVGContainer>
    )
}

