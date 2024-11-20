import { defaultSceneCommonMetaData } from "./constants";
import { NumberParamMetaToken, Scene, } from "./types";

function defaultParameterResolver<M extends Scene.MetaData>(
    props: Partial<Record<string, string>>,
    metaData: M
): Scene.ComponentProps<M> {
    const resolved: Partial<Scene.ComponentProps<M>> = {};

    for (const param in metaData) {
        if (props[param] == null) {
            resolved[param] = metaData[param]["default"];
            continue;
        }

        if (metaData[param].type == "number")
            resolved[param] = parseInt(props[param] as string);
        else
            resolved[param] = props[param] as string;
    }

    return resolved as Scene.ComponentProps<M>;
}

function defaultCommonParameterResolver(
    props: Partial<Record<string, string>>,
): Scene.ComponentProps<Scene.CommonMetaData> {
    return defaultParameterResolver<Scene.CommonMetaData>(props, defaultSceneCommonMetaData)
}

function resolveParameterConstraints<M extends Scene.MetaData>(
    props: Scene.ComponentProps<M>,
    metaData: M
): Scene.ComponentProps<M> {
    for (const param in metaData) {
        if (metaData[param].type == "number") {
            const meta = metaData[param] as NumberParamMetaToken;

            props[param] = fitInStep(
                props[param] as number,
                meta.min,
                meta.max,
                meta.step
            );
        }
    }

    return props;
}

function fitInStep(v: number, min: number, max: number, step: number): number {
    v = Math.max(Math.min(max, v), min);
    return v - ((v - min) % step);
}

export { defaultParameterResolver, resolveParameterConstraints, defaultCommonParameterResolver }