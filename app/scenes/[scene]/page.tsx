import { fetchScene, fetchSceneMetas } from "@/app/scene-components/utils/fetch-scenes";
import { defaultParameterResolver, resolveParameterConstraints } from "@/app/scene-components/utils/resolver";
import { SceneComponentPropsWithSize, SceneModule } from "@/app/scene-components/utils/types";


export async function generateStaticParams(): Promise<{ scene: string }[]> {
    const scenes = await fetchSceneMetas();
    return scenes.map(s => ({ scene: s.route }));
}

export default async function Page({ params, searchParams }: { params: { scene: string }, searchParams: object }) {
    const sceneModule: SceneModule = await fetchScene(params.scene);
    const SceneComponent = sceneModule.SceneComponent;
    const meta = sceneModule.meta;

    searchParams = defaultParameterResolver(searchParams, meta);
    searchParams = resolveParameterConstraints(searchParams as SceneComponentPropsWithSize<typeof meta>, meta);

    return (
        <SceneComponent {...searchParams} />
    )
}

