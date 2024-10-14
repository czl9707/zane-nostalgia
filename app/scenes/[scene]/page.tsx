// import fs from 'fs';
// import path from 'path';

import { defaultParameterResolver, resolveParameterConstraints } from "@/app/scene-components/utils/resolver";
import { SceneComponentPropsWithSize, SceneModule } from "@/app/scene-components/utils/types";


// export function generateStaticParams(): { scene: string }[] {
//     const currentDir = path.dirname(process.cwd());
//     const sceneDir = path.join(path.basename(path.basename(currentDir)), "scene-components");
//     const scenes = fs.readdirSync(sceneDir);
//     console.log(scenes.map(s => ({ scene: s.slice(0, s.indexOf(".")) })));
//     return scenes.map(s => ({ scene: s.slice(0, s.indexOf(".")) }));
// }

export default async function Page({ params, searchParams }: { params: { scene: string }, searchParams: object }) {
    const sceneModule: SceneModule = await import(`../../scene-components/${params.scene}`);
    const SceneComponent = sceneModule.SceneComponent;
    const meta = sceneModule.meta;

    searchParams = defaultParameterResolver(searchParams, meta);
    searchParams = resolveParameterConstraints(searchParams as SceneComponentPropsWithSize<typeof meta>, meta);

    return (
        <SceneComponent {...searchParams} />
    )
}

