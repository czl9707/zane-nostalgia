import { Error as ErrorIcon } from "@/app/components/ui/icons/icons";
import { ColorParamMetaToken, NumberParamMetaToken, StringParamMetaToken, RandomSeedParamMetaToken, Scene, } from "./utils/types";


export interface FourOFourMeta extends Scene.MetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    density: NumberParamMetaToken,
    textContent: StringParamMetaToken,
    geoSeed: RandomSeedParamMetaToken,
}


const fourOFourMeta: FourOFourMeta = {
    color: {
        name: "Color",
        type: "color",
        default: "#220000",
        group: "Color",
    },
    backgroundColor: {
        name: "Background Color",
        type: "color",
        default: "#000000",
        group: "Color",
    },
    density: {
        name: "Density",
        type: "number",
        default: 6,
        min: 2,
        max: 10,
        step: 1,
        group: "Geometry",
    },
    textContent: {
        name: "Content",
        type: "string",
        default: "404",
        group: "Geometry",
    },
    geoSeed: {
        name: "Random Seed",
        type: "randomSeed",
        default: "FourOFour",
        group: "Geometry",
    }
};

export const Icon: Scene.ComponentMetaModule<FourOFourMeta>["Icon"] = ErrorIcon;
export const name: Scene.ComponentMetaModule<FourOFourMeta>["name"] = "404";
export const meta: Scene.ComponentMetaModule<FourOFourMeta>["meta"] = fourOFourMeta;