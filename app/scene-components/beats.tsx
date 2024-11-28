import * as React from "react";
import seedrandom from "seedrandom";

import { IconProps, SvgIcon } from "@/app/components/ui/icons/icons"
import { randomFitToInt } from "@/app/components/utils/math-utils";
import { ColorParamMetaToken, NumberParamMetaToken, RandomSeedParamMetaToken, Scene } from "./utils/types";
import SceneComponent from "./utils/scene-component";


interface BeatsMeta extends Scene.MetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    density: NumberParamMetaToken,
    geoSeed: RandomSeedParamMetaToken,
}

export const beatsMeta: BeatsMeta = {
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

function Beats({
    color,
    backgroundColor,
    density,
    height,
    width,
    geoSeed,
}: Scene.ComponentProps<BeatsMeta & Scene.CommonMetaData>) {
    return (
        <>
            <rect width={`${width}px`} height={`${height}px`} fill={backgroundColor} />
        </>
    );
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

export const Icon: Scene.Module<BeatsMeta>["Icon"] = PlannerReviewIcon;
export const name: Scene.Module<BeatsMeta>["name"] = "Beats";
export const meta: Scene.Module<BeatsMeta>["meta"] = beatsMeta;

export const RawComponent: Scene.Module<BeatsMeta>["RawComponent"] = Beats;
export const Component: Scene.Module<BeatsMeta>["Component"] = (props: Record<string, string>) => {
    return <SceneComponent Component={Beats} meta={meta} {...props} />
}
