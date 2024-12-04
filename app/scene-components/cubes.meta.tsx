import * as React from "react";

import { IconProps, SvgIcon } from "@/app/components/ui/icons/icons"
import { ColorParamMetaToken, EnumParamMetaToken, NumberParamMetaToken, RandomSeedParamMetaToken, Scene } from "./utils/types";


export interface CubesMeta extends Scene.MetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    rotation: NumberParamMetaToken,
    animateVariant: EnumParamMetaToken<'random' | 'sequential'>,
    geoSeed: RandomSeedParamMetaToken,
}

const RandomIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function Random(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} >
                <path d="M180-180v-276.15h140V-180H180Zm230 0v-600h140v600H410Zm230 0v-403.84h140V-180H640Z" />
            </SvgIcon>
        );
    }
)
const SequentialIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function Sequential(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} >
                <path d="M180-180v-276.15h140V-180H180Zm230 0v-403.84h140V-180H640Zm230 0v-600h140v600H410Z" />
            </SvgIcon>
        );
    }
)

const meteorMeta: CubesMeta = {
    color: {
        name: "Color",
        type: "color",
        default: "#222222",
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
        default: 0,
        min: -40,
        max: 45,
        step: 5,
        group: "Geometry",
    },
    animateVariant: {
        name: "Animation Variant",
        type: "enum",
        default: "sequential",
        options: {
            "random": RandomIcon,
            "sequential": SequentialIcon,
        },
        group: "Geometry",
    },
    geoSeed: {
        name: "Random Seed",
        type: "randomSeed",
        default: "Cubes",
        group: "Geometry",
    }
};

const CubeIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function DeployedCode(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} >
                <path d="M450-177.23v-285.54L200-607.54v278.62q0 3.07 1.54 5.77 1.54 2.69 4.61 4.61L450-177.23Zm60 0 243.85-141.31q3.07-1.92 4.61-4.61 1.54-2.7 1.54-5.77v-278.62L510-462.77v285.54Zm-30-337.23 247-142.77-240.85-139.31q-3.07-1.92-6.15-1.92-3.08 0-6.15 1.92L233-657.23l247 142.77ZM176.16-265.85q-17.08-9.84-26.62-26.3-9.54-16.47-9.54-36.16v-303.38q0-19.69 9.54-36.16 9.54-16.46 26.62-26.3l267.69-154.08q17.07-9.85 36.15-9.85t36.15 9.85l267.69 154.08q17.08 9.84 26.62 26.3 9.54 16.47 9.54 36.16v303.38q0 19.69-9.54 36.16-9.54 16.46-26.62 26.3L516.15-111.77q-17.07 9.85-36.15 9.85t-36.15-9.85L176.16-265.85ZM480-480Z" />
            </SvgIcon>
        );
    }
)

export const Icon: Scene.ComponentMetaModule<CubesMeta>["Icon"] = CubeIcon;
export const name: Scene.ComponentMetaModule<CubesMeta>["name"] = "Cubes";
export const meta: Scene.ComponentMetaModule<CubesMeta>["meta"] = meteorMeta;