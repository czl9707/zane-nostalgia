import { ColorParamMetaToken, NumberParamMetaToken, Scene, StringParamMetaToken } from "./types";

export interface CommonMetaData extends Scene.MetaData {
    width: NumberParamMetaToken,
    height: NumberParamMetaToken,
    bannerText: StringParamMetaToken,
    bannerColor: ColorParamMetaToken,
}

export const defaultSceneCommonMetaData: CommonMetaData = {
    height: {
        name: "Height",
        type: "number",
        default: 800,
        min: 200,
        max: 2400,
        step: 200,
        group: "Screen Size",
    },
    width: {
        name: "Width",
        type: "number",
        default: 1800,
        min: 400,
        max: 3600,
        step: 200,
        group: "Screen Size",
    },
    bannerText: {
        name: "Text",
        type: "string",
        default: "",
        group: "Banner",
    },
    bannerColor: {
        name: "Color",
        type: "color",
        default: "#FFFFFF",
        group: "Banner",
    },
}

