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

interface StringParamMetaToken extends BaseParamMetaToken {
    type: "string",
    default: string,
}

type ParamMetaToken =
    ColorParamMetaToken |
    NumberParamMetaToken |
    StringParamMetaToken;

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
    export type Module<M extends MetaData = MetaData> = {
        RawComponent: React.FC<ComponentProps<M & CommonMetaData>>,
        Component: React.FC<Record<string, string>>,
        Icon: React.ElementType,
        name: string,
        meta: M
    }
}



export type {
    ParamMetaToken,
    ColorParamMetaToken,
    NumberParamMetaToken,
    StringParamMetaToken,
    Scene,
}