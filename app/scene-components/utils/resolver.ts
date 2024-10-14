import { defaultSceneSizeMetaData } from "./constants";
import { SceneMetaData, SceneComponentPropsWithSize, NumberParamMetaToken } from "./types";

function defaultParameterResolver<M extends SceneMetaData, P extends Partial<SceneComponentPropsWithSize<M>>>(props: P, metaData: M): P {
    for (const param in metaData) {
        if (props[param] == null) {
            props[param] = metaData[param]["default"] as P[typeof param];
        }
    }

    if (props.width == null) props.width = defaultSceneSizeMetaData.width.default;
    if (props.height == null) props.height = defaultSceneSizeMetaData.height.default;

    return props;
}

function resolveParameterConstraints<M extends SceneMetaData, P extends SceneComponentPropsWithSize<M>>(props: P, metaData: M): P {
    for (const param in metaData) {
        if (metaData[param].type == "number") {
            const meta = metaData[param] as NumberParamMetaToken;
            props[param] = fitInStep(
                props[param] as number,
                meta.min,
                meta.max,
                meta.step
            ) as P[typeof param];
        }
    }

    return props;
}

function fitInStep(v: number, min: number, max: number, step: number): number {
    v = Math.max(Math.min(max, v), min);
    return v - ((v - min) % step);
}

export { defaultParameterResolver, resolveParameterConstraints }