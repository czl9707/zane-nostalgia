import { defaultSceneSizeMetaData } from "../../scene-components/utils/constants";
import { fetchScene, fetchSceneMetas } from "../../scene-components/utils/fetch-scenes";
import { defaultParameterResolver, defaultSizeParameterResolver, resolveParameterConstraints } from "../../scene-components/utils/resolver";
import { SceneModule } from "../../scene-components/utils/types";


export async function generateStaticParams(): Promise<{ scene: string }[]> {
    const scenes = await fetchSceneMetas();
    return scenes.map(s => ({ scene: s.route }));
}


export default async function Page({ params, searchParams }: { params: Promise<{ scene: string }>, searchParams: { [key: string]: string } }) {
    const sceneModule: SceneModule = await fetchScene((await params).scene);
    const SceneComponent = sceneModule.SceneComponent;

    const resolvedParam = defaultParameterResolver(searchParams, sceneModule.meta);
    const resolvedSizeParam = defaultSizeParameterResolver(searchParams);
    const resolved = resolveParameterConstraints({ ...resolvedParam, ...resolvedSizeParam }, { ...sceneModule.meta, ...defaultSceneSizeMetaData });

    return (
        <SceneComponent {...resolved} />
    )
}

