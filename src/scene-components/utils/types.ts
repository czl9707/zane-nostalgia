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

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Scene {
    export type MetaData = { [key: string]: ParamMetaToken }
    export type RawComponentProps<M extends MetaData> = {
        [key in keyof (M)]: M[key]["default"]
    }
    export type ComponentProps<M extends MetaData> = {
        [key in keyof (M)]?: M[key]["default"]
    }
    export type ComponentModule<M extends MetaData> = {
        Icon: React.ElementType,
        name: string,
        route: string,
        meta: M,
        Component: React.FC<ComponentProps<M>>
    }

    export type AnyComponentModule = {
        Icon: React.ElementType,
        name: string,
        route: string,
        meta: MetaData,
        Component: React.ElementType
    }
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