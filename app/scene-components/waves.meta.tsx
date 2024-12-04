import * as React from "react";

import { SvgIcon, IconProps } from "@/app/components/ui/icons/icons";
import { ColorParamMetaToken, NumberParamMetaToken, RandomSeedParamMetaToken, Scene } from "./utils/types";

export interface WavesMeta extends Scene.MetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    waveAmount: NumberParamMetaToken,
    waveComplexity: NumberParamMetaToken,
    waveHeight: NumberParamMetaToken,
    geoSeed: RandomSeedParamMetaToken,
}

const wavesMeta: WavesMeta = {
    color: {
        name: "Color",
        type: "color",
        default: "#444444",
        group: "Color",
    },
    backgroundColor: {
        name: "Background Color",
        type: "color",
        default: "#000000",
        group: "Color",
    },
    waveAmount: {
        name: "Waves Amount",
        type: "number",
        default: 5,
        min: 3,
        max: 10,
        step: 1,
        group: "Geometry",
    },
    waveComplexity: {
        name: "Waves Complexity",
        type: "number",
        default: 3,
        min: 1,
        max: 8,
        step: 1,
        group: "Geometry",
    },
    waveHeight: {
        name: "Waves Height",
        type: "number",
        default: 50,
        min: 30,
        max: 100,
        step: 5,
        group: "Geometry",
    },
    geoSeed: {
        name: "Random Seed",
        type: "randomSeed",
        default: "MeteorShower",
        group: "Geometry",
    }
};


const WaterIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function WaterIcon(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} >
                <path d="M90-255.39v-60.76q34.54-1.93 52.46-20.2 17.93-18.26 71.54-18.26 54.77 0 74.42 20 19.66 20 57.96 20 39.54 0 59.2-20 19.65-20 74.42-20 53.54 0 74.42 20 20.89 20 59.2 20 39.53 0 58.57-20t73.81-20q53.61 0 71.54 18.26 17.92 18.27 52.46 20.2v60.76q-46.62-2.3-67.5-20.77-20.88-18.46-56.5-18.46-37.92 0-57.77 20t-74.61 20q-53.54 0-74.43-20-20.88-20-59.19-20-39.54 0-59.19 20-19.66 20-74.43 20-54.76 0-74-20-19.23-20-58.38-20-37.23 0-56.31 18.46-19.07 18.47-67.69 20.77Zm0-155.38v-60.77q34.54-1.92 52.46-20.19Q160.39-510 214-510q53.54 0 73.81 20 20.27 20 58.57 20 39.54 0 59.2-20 19.65-20 74.42-20 53.54 0 74.12 20 20.57 20 58.26 20 39.54 0 59.2-20 19.65-20 74.42-20 52.38 0 71.54 18.27 19.15 18.27 52.46 20.19v60.77q-47.85-2.31-68.12-20.77Q781.62-450 746-450q-37.92 0-57.77 20t-74.61 20q-53.54 0-74.43-20-20.88-20-59.19-20-39.54 0-58.58 20t-73.8 20q-54.77 0-75.24-20-20.46-20-58.38-20-36 0-56.31 18.46-20.31 18.46-67.69 20.77Zm0-155.38v-60.77q34.54-1.93 52.46-20.19 17.93-18.27 71.54-18.27 53.54 0 73.81 20 20.27 20 58.57 20 39.54 0 59.2-20 19.65-20 74.42-20 53.54 0 74.12 20 20.57 20 58.26 20 39.54 0 59.2-20 19.65-20 74.42-20 52.38 0 71.54 18.27 19.15 18.26 52.46 20.19v60.77q-47.85-2.31-68.12-20.77-20.26-18.47-55.88-18.47-37.92 0-57.77 20t-74.61 20q-53.54 0-74.43-20-20.88-20-59.19-20-39.54 0-58.58 20t-73.8 20q-54.77 0-75.24-20-20.46-20-58.38-20-36 0-56.69 18.47-20.69 18.46-67.31 20.77Z" />
            </SvgIcon>
        );
    }
)


export const Icon: Scene.ComponentMetaModule<WavesMeta>["Icon"] = WaterIcon;
export const name: Scene.ComponentMetaModule<WavesMeta>["name"] = "Waves";
export const meta: Scene.ComponentMetaModule<WavesMeta>["meta"] = wavesMeta;