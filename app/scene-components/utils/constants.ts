import { Scene } from "./types";

export const defaultSceneCommonMetaData: Scene.CommonMetaData = {
    height: {
        name: "Height",
        type: "number",
        default: 800,
        min: 200,
        max: 2400,
        step: 200,

        controlOrder: 998,
    },
    width: {
        name: "Width",
        type: "number",
        default: 1800,
        min: 400,
        max: 3600,
        step: 200,

        controlOrder: 999,
    },

    banner: {
        name: "Banner",
        type: "string",
        default: "",

        controlOrder: 997,
    },
}

