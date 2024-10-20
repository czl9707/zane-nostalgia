import { defaultSceneSizeMetaData } from "./constants";
import { SceneMetaData, SceneComponentProps, NumberParamMetaToken, SceneSizeMetaData } from "./types";

function defaultParameterResolver<M extends SceneMetaData>(
    props: Partial<{ [key: string]: string }>,
    metaData: M
): SceneComponentProps<M> {
    const resolved: SceneComponentProps<M> = {} as SceneComponentProps<M>;

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

    return resolved;
}

function defaultSizeParameterResolver(
    props: Partial<{ [key: string]: string }>,
): SceneComponentProps<SceneSizeMetaData> {
    const resolved: SceneComponentProps<SceneSizeMetaData> = {} as SceneComponentProps<SceneSizeMetaData>;

    for (const param in defaultSceneSizeMetaData) {
        if (props[param] == null) {
            resolved[param] = defaultSceneSizeMetaData[param]["default"];
        }
        else {
            resolved[param] = parseInt(props[param] as string);
        }
    }

    return resolved;
}

function resolveParameterConstraints<M extends SceneMetaData>(props: SceneComponentProps<M>, metaData: M): SceneComponentProps<M> {
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

export { defaultParameterResolver, resolveParameterConstraints, defaultSizeParameterResolver }