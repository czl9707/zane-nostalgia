import { defaultSceneSizeMetaData } from "@/app/scene-components/utils/constants";
import { fetchScene, fetchSceneMetas } from "@/app/scene-components/utils/fetch-scenes";
import { defaultParameterResolver, resolveParameterConstraints } from "@/app/scene-components/utils/resolver";
import { SceneModule } from "@/app/scene-components/utils/types";


export async function generateStaticParams(): Promise<{ scene: string }[]> {
    const scenes = await fetchSceneMetas();
    return scenes.map(s => ({ scene: s.route }));
}

export default async function Page({ params, searchParams }: { params: { scene: string }, searchParams: { [key: string]: string } }) {
    const sceneModule: SceneModule = await fetchScene(params.scene);
    const SceneComponent = sceneModule.SceneComponent;
    const meta = sceneModule.meta;

    let resolved = defaultParameterResolver(searchParams, meta);
    const sizeParam = {
        height: defaultSceneSizeMetaData.height.default,
        width: defaultSceneSizeMetaData.width.default,
    }
    resolved = resolveParameterConstraints({ ...resolved, ...sizeParam }, meta);

    return (
        <SceneComponent {...resolved} />
    )
}

