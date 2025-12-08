import * as React from "react";

import { SvgIcon, type IconProps } from "@/components/ui/icons/icons";
import type { ColorParamMetaToken, EnumParamMetaToken, NumberParamMetaToken, RandomSeedParamMetaToken, Scene } from "./utils/types";
import { defaultSceneCommonMetaData, type CommonMetaData } from "./utils/constants";

export interface BeatsMeta extends CommonMetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    density: NumberParamMetaToken,  // graphic unit per 200px
    strength: NumberParamMetaToken,
    frequency: NumberParamMetaToken, // min beats per second
    pathVariant: EnumParamMetaToken<'line' | 'bar'>,
    align: EnumParamMetaToken<'top' | 'middle' | 'bottom'>,
    geoSeed: RandomSeedParamMetaToken,
}

const PlannerReviewIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function PlannerReview(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} >
                <path d="M488.85-90 359.62-691.23 263.92-250H90v-60h125.69l112.62-520h63.23L522-222.61 607.31-590h65l72 280H870v60H697.69l-56.46-221.08L552.69-90h-63.84Z" />
            </SvgIcon>
        );
    }
)
const BarChartIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function BarChart(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} >
                <path d="M640-180v-236.15h140V-180H640Zm-230 0v-600h140v600H410Zm-230 0v-403.84h140V-180H180Z" />
            </SvgIcon>
        );
    }
)
const AlignEndIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function AlignEnd(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} >
                <path d="M100-100v-60h760v60H100Zm190-430v-100h380v100H290Zm0 240v-100h380v100H290Z" />
            </SvgIcon>
        );
    }
)
const AlignStartIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function AlignStart(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} >
                <path d="M100-800v-60h760v60H100Zm190 230v-100h380v100H290Zm0 240v-100h380v100H290Z" />
            </SvgIcon>
        );
    }
)
const AlignCenterIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function AlignCenter(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} >
                <path d="M100-450v-60h760v60H100Zm190-120v-100h380v100H290Zm0 280v-100h380v100H290Z" />
            </SvgIcon>
        );
    }
)


const beatsMeta: BeatsMeta = {
    ...defaultSceneCommonMetaData,
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
    density: {
        name: "Density",
        type: "number",
        default: 5,
        min: 3,
        max: 10,
        step: 1,
        group: "Geometry",
    },
    strength: {
        name: "Strength",
        type: "number",
        default: 150,
        min: 50,
        max: 300,
        step: 50,
        group: "Geometry",
    },
    frequency: {
        name: "Frequency",
        type: "number",
        default: 3,
        min: 1,
        max: 5,
        step: 1,
        group: "Geometry",
    },
    pathVariant: {
        name: "Variant",
        type: "enum",
        default: "bar",
        options: {
            "line": <PlannerReviewIcon />,
            "bar": <BarChartIcon />,
        },
        group: "Geometry",
    },
    align: {
        name: "Align",
        type: "enum",
        default: "middle",
        options: {
            "top": <AlignStartIcon />,
            "middle": <AlignCenterIcon />,
            "bottom": <AlignEndIcon />,
        },
        group: "Geometry",
    },
    geoSeed: {
        name: "Random Seed",
        type: "randomSeed",
        default: "Beat",
        group: "Geometry",
    }
};

export const Icon: Scene.ComponentMetaModule<BeatsMeta>["Icon"] = PlannerReviewIcon;
export const name: Scene.ComponentMetaModule<BeatsMeta>["name"] = "Beats";
export const meta: Scene.ComponentMetaModule<BeatsMeta>["meta"] = beatsMeta;