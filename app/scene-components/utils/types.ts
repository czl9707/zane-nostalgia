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


type ParamMetaToken = ColorParamMetaToken | NumberParamMetaToken
type SceneMetaData = { [key: string]: ParamMetaToken }

interface SceneSizeMetaData extends SceneMetaData {
    width: NumberParamMetaToken,
    height: NumberParamMetaToken,
}


type SceneComponentProps<M extends SceneMetaData> = {
    [key in keyof (M)]: M[key]["default"]
}

interface SceneModule {
    SceneComponent: React.ElementType,
    SceneIcon: React.ElementType,
    name: string,
    meta: SceneMetaData
}

export type {
    ColorParamMetaToken,
    NumberParamMetaToken,
    SceneMetaData,
    SceneSizeMetaData,
    SceneComponentProps,
    SceneModule,
}