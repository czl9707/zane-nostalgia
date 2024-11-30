import * as React from "react";
import seedrandom from "seedrandom";

import { IconProps, SvgIcon } from "@/app/components/ui/icons/icons"
import { ColorParamMetaToken, NumberParamMetaToken, RandomSeedParamMetaToken, Scene } from "./utils/types";
import SceneComponent from "./utils/scene-component";


interface SoundsMeta extends Scene.MetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    density: NumberParamMetaToken,  // graphic unit per 200px
    strength: NumberParamMetaToken,
    frequency: NumberParamMetaToken,
    geoSeed: RandomSeedParamMetaToken,
}

export const soundsMeta: SoundsMeta = {
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
        default: 15,
        min: 5,
        max: 20,
        step: 1,
        group: "Geometry",
    },
    strength: {
        name: "Strength",
        type: "number",
        default: 200,
        min: 100,
        max: 600,
        step: 100,
        group: "Geometry",
    },
    frequency: {
        name: "Frequency",
        type: "number",
        default: 15,
        min: 5,
        max: 20,
        step: 1,
        group: "Geometry",
    },
    geoSeed: {
        name: "Random Seed",
        type: "randomSeed",
        default: "Sounds",
        group: "Geometry",
    }
};


const BEAT_ANIMATE_STEP = 0.02;
const BEAT_NO_SCALE = 0.0001;

function Sounds({
    color,
    backgroundColor,
    density,
    strength,
    geoSeed,
    frequency,
    height,
    width,
}: Scene.ComponentProps<SoundsMeta & Scene.CommonMetaData>) {
    const geoGenerator = seedrandom(geoSeed);
    const animationGenerator = seedrandom(geoSeed);
    const geoCount = Math.floor(width * 0.8 / (200 / density));
    const xPositions = [...Array(geoCount)].map((_, i) => Math.floor(width * 0.1 + width * 0.8 / geoCount * (i + 1)));

    const positions: { x: number, y: number }[][] = [...Array(3)].map(_ =>
        xPositions.map((x) => ({ x, y: roundDown(geoGenerator() * 2 - 1) }))
    );

    const animateScaleValues: number[] = [BEAT_NO_SCALE];
    const animatekeyTimesValues: number[] = [0];
    while (true) {
        const step = roundDown(animationGenerator() / frequency);
        const volumn = Math.floor(strength * (0.2 + 0.8 * animationGenerator()));

        if (animatekeyTimesValues[animatekeyTimesValues.length - 1] + BEAT_ANIMATE_STEP * 2 + step > 1) break;

        animatekeyTimesValues.push(roundDown(animatekeyTimesValues[animatekeyTimesValues.length - 1] + step));
        animateScaleValues.push(BEAT_NO_SCALE);
        animatekeyTimesValues.push(roundDown(animatekeyTimesValues[animatekeyTimesValues.length - 1] + BEAT_ANIMATE_STEP));
        animateScaleValues.push(volumn);
        animatekeyTimesValues.push(roundDown(animatekeyTimesValues[animatekeyTimesValues.length - 1] + BEAT_ANIMATE_STEP));
        animateScaleValues.push(BEAT_NO_SCALE);
    }
    animateScaleValues.push(BEAT_NO_SCALE);
    animatekeyTimesValues.push(1);

    return (
        <>
            <rect width={`${width}px`} height={`${height}px`} fill={backgroundColor} />
            <g transform={`translate(0, ${height / 2})`}>
                <path strokeWidth={1} fill="none" stroke={color} vectorEffect="non-scaling-stroke">
                    <animateTransform attributeName="transform" type="scale" dur="2s" repeatCount="indefinite"
                        values={animateScaleValues.map(v => `1 ${v}`).join(";")}
                        keyTimes={animatekeyTimesValues.join(";")}
                    />
                    <animate attributeName="d" values={positions.map(ps => linearPathRenderer(ps, width)).join(";")}
                        dur="1s" repeatCount="indefinite" />
                </path>
            </g>
        </>
    );
}

function linearPathRenderer(positions: { x: number, y: number }[], width: number): string {
    return `M0 0 L${width * 0.1} 0 ` +
        positions.map(({ x, y }) => `L${x} ${y}`).join(" ") +
        `L${width * 0.9} 0 L${width} 0`;
}

function roundDown(num: number): number {
    return Math.floor(num * 1000) / 1000;
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

export const Icon: Scene.Module<SoundsMeta>["Icon"] = PlannerReviewIcon;
export const name: Scene.Module<SoundsMeta>["name"] = "Sounds";
export const meta: Scene.Module<SoundsMeta>["meta"] = soundsMeta;

export const RawComponent: Scene.Module<SoundsMeta>["RawComponent"] = Sounds;
export const Component: Scene.Module<SoundsMeta>["Component"] = (props: Record<string, string>) => {
    return <SceneComponent Component={Sounds} meta={meta} {...props} />
}
