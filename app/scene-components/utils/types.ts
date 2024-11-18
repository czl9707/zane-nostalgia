interface BaseParamMetaToken {
    name: string,
    type: string,
    default: unknown,
    controlOrder: number,
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
    }
    export type ComponentProps<M extends MetaData> = {
        [key in keyof (M)]: M[key]["default"]
    }
    export type Module<M extends MetaData = MetaData> = {
        Component: React.FC<ComponentProps<M & CommonMetaData>>,
        Icon: React.ElementType,
        name: string,
        meta: M
    }
}



export type {
    ColorParamMetaToken,
    NumberParamMetaToken,
    StringParamMetaToken,
    Scene,
}