import { SceneSizeMetaData } from "./types";

export const defaultSceneSizeMetaData: SceneSizeMetaData = {
    height: {
        name: "Height",
        type: "number",
        default: 1200,
        min: 400,
        max: 2400,
        step: 200,
    },
    width: {
        name: "Width",
        type: "number",
        default: 1600,
        min: 600,
        max: 3600,
        step: 200,
    },
}

export const ALL_SCENES = ["meteor"] as const;
