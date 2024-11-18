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
        <svg viewBox={`0 0 ${resolved.width} ${resolved.height}`}
            height={`${resolved.height}px`} width={`${resolved.width}px`}
            role="img" xmlns="http://www.w3.org/2000/svg"
        >
            <sceneModule.Component {...resolved} />
            {resolved.banner &&
                <text x="50%" y="50%"
                    dominant-baseline="middle" text-anchor="middle"
                    style={{ fill: "white", fontSize: "3rem" }}
                >
                    {resolved.banner}
                </text>
            }
        </svg>
    )
}