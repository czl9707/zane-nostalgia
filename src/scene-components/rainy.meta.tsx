import * as React from "react";

import { IconProps, SvgIcon } from "@/components/ui/icons/icons"
import { ColorParamMetaToken, NumberParamMetaToken, RandomSeedParamMetaToken, Scene } from "./utils/types";


export interface RainyMeta extends Scene.MetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    density: NumberParamMetaToken,
    geoSeed: RandomSeedParamMetaToken,
}

const rainyMeta: RainyMeta = {
    color: {
        name: "Color",
        type: "color",
        default: "#888888",
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
        default: 10,
        min: 5,
        max: 20,
        step: 1,
        group: "Geometry",
    },
    geoSeed: {
        name: "Random Seed",
        type: "randomSeed",
        default: "Rainy",
        group: "Geometry",
    }
};

const LightRainyIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function LightRainy(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} >
                <path d="M193.38-493.23q-11.15 5.69-22.8 1.73-11.66-3.96-17.35-15.12l-100-200q-5.69-11.15-1.73-22.8 3.96-11.66 15.12-17.35 11.15-5.69 22.8-1.73 11.66 3.96 17.35 15.12l100 200q5.69 11.15 1.73 22.8-3.96 11.66-15.12 17.35Zm140 280q-11.15 6.08-22.8 1.92-11.66-4.15-17.73-15.31l-80-160q-5.7-11.15-1.54-22.8 4.15-11.66 15.31-17.73 11.15-5.7 22.8-1.54 11.66 4.15 17.35 15.31l80.38 160q5.7 11.15 1.54 22.61-4.15 11.46-15.31 17.54Zm82-200q-11.15 5.69-23 1.73-11.84-3.96-17.53-15.12l-140-280q-5.7-11.15-1.73-22.8 3.96-11.66 15.11-17.35 11.15-6.08 23-1.92 11.85 4.15 17.54 15.31l140 280q5.69 11.15 1.73 22.8-3.96 11.66-15.12 17.35Zm86-200q-11.15 6.08-22.8 2.11-11.66-3.96-17.35-15.11l-39.38-80.39q-5.7-11.15-1.73-23 3.96-11.84 15.11-17.53 11.15-5.7 22.69-1.54 11.54 4.15 17.23 15.31l40 80q5.7 11.15 1.54 22.61-4.15 11.46-15.31 17.54Zm24 399.38q-11.15 6.08-23 2.23-11.84-3.84-17.53-15l-40-80q-5.7-11.15-1.54-23 4.15-11.84 15.31-17.53 11.15-5.7 22.61-1.54 11.46 4.15 17.54 15.31l40.38 79.61q5.7 11.15 1.54 22.5-4.15 11.35-15.31 17.42Zm186 0q-11.15 6.08-22.8 2.23-11.66-3.84-17.35-15l-140-280q-5.69-11.15-1.73-22.8 3.96-11.66 15.12-17.73 11.15-5.7 23-1.54 11.84 4.15 17.53 15.31l140 279.61q5.7 11.15 1.54 22.5-4.15 11.35-15.31 17.42Zm62-239.38q-11.15 6.08-22.8 1.92-11.66-4.15-17.73-15.31l-120-240q-5.7-11.15-1.54-23 4.15-11.84 15.31-17.53 11.15-5.7 22.8-1.54 11.66 4.15 17.35 15.31l120 240q5.69 11.15 1.73 22.8-3.96 11.66-15.12 17.35Zm120 240q-11.15 6.08-22.8 1.92-11.66-4.15-17.73-15.31l-60-120q-5.7-11.15-1.54-23 4.15-11.84 15.31-17.53 11.15-5.7 22.8-1.54 11.66 4.15 17.35 15.31l60 120q5.69 11.15 1.73 22.8-3.96 11.66-15.12 17.35Z" />
            </SvgIcon>
        );
    }
)

export const Icon: Scene.ComponentMetaModule<RainyMeta>["Icon"] = LightRainyIcon;
export const name: Scene.ComponentMetaModule<RainyMeta>["name"] = "Rainy";
export const meta: Scene.ComponentMetaModule<RainyMeta>["meta"] = rainyMeta;