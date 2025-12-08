import * as React from "react";

import { SvgIcon, type IconProps } from "@/components/ui/icons/icons";
import type { ColorParamMetaToken, NumberParamMetaToken, RandomSeedParamMetaToken, Scene } from "./utils/types";
import { defaultSceneCommonMetaData, type CommonMetaData } from "./utils/constants";

export interface MeteroShowerMeta extends CommonMetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    rotation: NumberParamMetaToken,
    density: NumberParamMetaToken,
    geoSeed: RandomSeedParamMetaToken,
}


const meteorMeta: MeteroShowerMeta = {
    ...defaultSceneCommonMetaData, 
    color: {
        name: "Color",
        type: "color",
        default: "#ffff00",
        group: "Color",
    },
    backgroundColor: {
        name: "Background Color",
        type: "color",
        default: "#000000",
        group: "Color",
    },
    rotation: {
        name: "Rotation",
        type: "number",
        default: 45,
        min: 0,
        max: 180,
        step: 5,
        group: "Geometry",
    },
    density: {
        name: "Density",
        type: "number",
        default: 10,
        min: 5,
        max: 20,
        step: 1,
        group: "Geometry",
    },
    geoSeed: {
        name: "Random Seed",
        type: "randomSeed",
        default: "MeteorShower",
        group: "Geometry",
    }
};


const MeteorShowerIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function MeteorShower(props, ref) {
        return (
            <SvgIcon {...props} viewBoxSize='0 0 256 256' style={{ transform: "scale(0.75)" }} ref={ref} >
                <path d="M96 124a36 36 0 1 0 36 36a36 36 0 0 0-36-36m0 48a12 12 0 1 1 12-12a12 12 0 0 1-12 12m128.49-52.49a12 12 0 0 1 0 17l-48 48a12 12 0 0 1-17-17l48-48a12 12 0 0 1 17 0m-36-20a12 12 0 0 1 0 17l-20 20a12 12 0 0 1-17-17l20-20a12 12 0 0 1 17 0m44-27l-16 16a12 12 0 0 1-17-17l16-16a12 12 0 0 1 17 17m-113 15l72-72a12 12 0 0 1 17 17l-72 72a12 12 0 1 1-17-17m30.23 109.26a12 12 0 0 1 0 17A76 76 0 1 1 42.26 106.26L125 23.51a12 12 0 1 1 17 17l-82.77 82.72a52 52 0 0 0 73.54 73.54a12 12 0 0 1 16.97 0Z" />
            </SvgIcon>
        );
    }
)

export const Icon: Scene.ComponentMetaModule<MeteroShowerMeta>["Icon"] = MeteorShowerIcon;
export const name: Scene.ComponentMetaModule<MeteroShowerMeta>["name"] = "Meteor Shower";
export const meta: Scene.ComponentMetaModule<MeteroShowerMeta>["meta"] = meteorMeta;