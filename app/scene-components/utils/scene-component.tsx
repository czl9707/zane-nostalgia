import { Scene } from './types';
import { defaultCommonParameterResolver, defaultParameterResolver, resolveParameterConstraints } from './resolver';
import { defaultSceneCommonMetaData } from './constants';


export type SceneComponentProps = {
    name: string,
    [key: string]: string,
}

export default async function SceneComponent({ name, ...other }: SceneComponentProps) {
    const sceneModule: Scene.Module = await import(`../${name}`);

    const resolvedParam = defaultParameterResolver(other, sceneModule.meta);
    const resolvedSizeParam = defaultCommonParameterResolver(other);
    const resolved = resolveParameterConstraints({ ...resolvedParam, ...resolvedSizeParam }, { ...sceneModule.meta, ...defaultSceneCommonMetaData });

    return (
        <sceneModule.Component {...resolved} />
    )
}