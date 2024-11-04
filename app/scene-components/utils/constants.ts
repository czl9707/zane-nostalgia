import { SceneSizeMetaData } from "./types";

export const defaultSceneSizeMetaData: SceneSizeMetaData = {
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
}


export const ALL_SCENES = ["meteor"] as const;
