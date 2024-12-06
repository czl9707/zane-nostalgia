import React from "react";

interface BaseParamMetaToken {
    name: string,
    type: string,
    default: unknown,
    group: string,
}

interface ColorParamMetaToken extends BaseParamMetaToken {
    type: 'color',
    default: string,
}

interface NumberParamMetaToken extends BaseParamMetaToken {
    type: "number",
    default: number,
    min: number,
    max: number,
    step: number,
}

interface RandomSeedParamMetaToken extends BaseParamMetaToken {
    type: 'randomSeed',
    default: string,
}

interface StringParamMetaToken extends BaseParamMetaToken {
    type: "string",
    default: string,
}

interface EnumParamMetaToken<ENUM extends string> extends BaseParamMetaToken {
    type: "enum",
    default: ENUM,
    options: Record<ENUM, React.ReactElement>
}

type ParamMetaToken =
    ColorParamMetaToken |
    NumberParamMetaToken |
    StringParamMetaToken |
    RandomSeedParamMetaToken |
    EnumParamMetaToken<string>;

namespace Scene {
    export type MetaData = { [key: string]: ParamMetaToken }
    export interface CommonMetaData extends MetaData {
        width: NumberParamMetaToken,
        height: NumberParamMetaToken,
        bannerText: StringParamMetaToken,
        bannerColor: ColorParamMetaToken,
    }
    export type ComponentProps<M extends MetaData> = {
        [key in keyof (M)]: M[key]["default"]
    }
    export type ComponentMetaModule<M extends MetaData = MetaData> = {
        Icon: React.ElementType,
        name: string,
        meta: M
    }
    export type RawComponentType<M extends MetaData = MetaData> = React.FC<ComponentProps<M & CommonMetaData>>;
    export type ComponentType = React.FC<Record<string, string>>;
}



export type {
    ParamMetaToken,
    ColorParamMetaToken,
    NumberParamMetaToken,
    StringParamMetaToken,
    RandomSeedParamMetaToken,
    EnumParamMetaToken,
    Scene,
}