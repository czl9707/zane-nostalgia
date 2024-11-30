import * as React from "react";
import seedrandom from "seedrandom";

import { IconProps, SvgIcon } from "@/app/components/ui/icons/icons"
import { ColorParamMetaToken, EnumParamMetaToken, NumberParamMetaToken, RandomSeedParamMetaToken, Scene } from "./utils/types";
import SceneComponent from "./utils/scene-component";
import { randomFitToInt } from "../components/utils/math-utils";


interface BeatsMeta extends Scene.MetaData {
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
            "line": PlannerReviewIcon,
            "bar": BarChartIcon,
        },
        group: "Geometry",
    },
    align: {
        name: "Align",
        type: "enum",
        default: "middle",
        options: {
            "top": AlignStartIcon,
            "middle": AlignCenterIcon,
            "bottom": AlignEndIcon,
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


const BEAT_CYCLE_SEC = 5; // sec
const BEAT_STEP = 10; // px
const BEAT_ANIMATE_STEP_IN = 0.01;
const BEAT_ANIMATE_STEP_OUT = 0.05;
const BEAT_NO_SCALE = 0.001;

function Beats({
    color,
    backgroundColor,
    density,
    strength,
    geoSeed,
    align,
    pathVariant,
    frequency,
    height,
    width,
}: Scene.ComponentProps<BeatsMeta & Scene.CommonMetaData>) {
    const geoGenerator = seedrandom(geoSeed);
    const animationGenerator = seedrandom(geoSeed);
    const PathRenderer = pathVariant === "bar" ? BarPathRenderer : LinePathRenderer;
    const yOffset = align === "top" ? 0 : (
        align === "middle" ? height / 2 : height
    )

    // animations
    const animateScaleValues: number[] = [strength];
    const animatekeyTimesValues: number[] = [0];
    const lastKeyTime = () => animatekeyTimesValues[animatekeyTimesValues.length - 1];
    while (true) {
        const step = roundTo3Dec(animationGenerator() / BEAT_CYCLE_SEC / frequency);
        if (lastKeyTime() + step + BEAT_ANIMATE_STEP_IN > 1) break;

        if (step > BEAT_ANIMATE_STEP_OUT) {
            animatekeyTimesValues.push(roundTo3Dec(lastKeyTime() + BEAT_ANIMATE_STEP_OUT));
            animateScaleValues.push(BEAT_NO_SCALE);
            animatekeyTimesValues.push(roundTo3Dec(lastKeyTime() + step - BEAT_ANIMATE_STEP_OUT));
            animateScaleValues.push(BEAT_NO_SCALE);
            animatekeyTimesValues.push(roundTo3Dec(lastKeyTime() + BEAT_ANIMATE_STEP_IN));
            animateScaleValues.push(strength);
        }
        else {
            animatekeyTimesValues.push(roundTo3Dec(lastKeyTime() + step));
            animateScaleValues.push(Math.floor(strength * step / BEAT_ANIMATE_STEP_OUT));
            animatekeyTimesValues.push(roundTo3Dec(lastKeyTime() + BEAT_ANIMATE_STEP_IN * (BEAT_ANIMATE_STEP_OUT - step) / BEAT_ANIMATE_STEP_OUT));
            animateScaleValues.push(strength);
        }
    }
    animateScaleValues.push(strength);
    animatekeyTimesValues.push(1);

    return (
        <>
            <rect width={`${width}px`} height={`${height}px`} fill={backgroundColor} />
            <g transform={`translate(0, ${yOffset})`}>
                <PathRenderer geoGenerator={geoGenerator} color={color} density={density} width={width}>
                    <animateTransform attributeName="transform" type="scale" dur={`${BEAT_CYCLE_SEC}s`} repeatCount="indefinite"
                        values={animateScaleValues.map(v => `1 ${v}`).join(";")}
                        keyTimes={animatekeyTimesValues.join(";")}
                    />
                </PathRenderer>
            </g>
        </>
    );
}

function LinePathRenderer({ geoGenerator, color, children, width, density }: {
    geoGenerator: seedrandom.PRNG,
    color: string,
    children: React.ReactNode,
    width: number,
    density: number,
}) {
    const geoCount = Math.floor(width * 0.8 / (200 / density));
    const xPositions = [...Array(geoCount)].map((_, i) => Math.floor(width * 0.1 + width * 0.8 / geoCount * (i + 1)));
    xPositions.pop();
    const positions: { x: number, y: number }[][] = [...Array(3)].map(_ =>
        xPositions.map((x) => ({ x, y: roundTo3Dec(geoGenerator() * 2 - 1) }))
    );

    const singlePath = (ps: { x: number, y: number }[]) =>
        `M0 0 L${width * 0.1} 0 ` +
        ps.map(({ x, y }) => `L${x} ${y}`).join(" ") +
        `L${width * 0.9} 0 L${width} 0`;

    return (
        <>
            <style>
                {`@keyframes twisting {
                0% {d:path("${singlePath(positions[0])}");}
                50% {d:path("${singlePath(positions[1])}");}
                100% {d:path("${singlePath(positions[2])}");}
            }`}
            </style>
            <path strokeWidth={1} fill="none" stroke={color} vectorEffect="non-scaling-stroke"
                style={{ animation: "twisting 2s linear infinite alternate" }}>
                {children}
            </path>
        </>
    )
}

function BarPathRenderer({ geoGenerator, color, children, width, density }: {
    geoGenerator: seedrandom.PRNG,
    color: string,
    children: React.ReactNode,
    width: number,
    density: number,
}) {
    const positions: { x: number, y: number }[][] = [...Array(3)].map(_ => {
        const peeks = [...Array(density)].map(_ => ({
            x: randomFitToInt(geoGenerator(), width * 0.15, width * 0.7),
            y: randomFitToInt(geoGenerator(), 25, 75),
        }))

        return [...Array(Math.floor(width / BEAT_STEP))]
            .map((_, i) => Math.floor(BEAT_STEP * (i + 1)))
            .map((x) => ({
                x, y: - roundTo3Dec(peeks
                    .map(peek => peek.y * normalDistribution(x - peek.x))
                    .reduce((p, c) => p + c)
                )
            }))
    });

    const singlePath = ((ps: { x: number, y: number }[]) =>
        ps.map(({ x, y }) => `M${x} ${-y} V${y} h${BEAT_STEP - 4} V${-y}`).join(" "))

    return (
        <>
            <style>
                {`@keyframes twisting {
                0% {d:path("${singlePath(positions[0])}");}
                50% {d:path("${singlePath(positions[1])}");}
                100% {d:path("${singlePath(positions[2])}");}
            }`}
            </style>
            <path fill={color} strokeWidth={1} stroke={color} vectorEffect="non-scaling-stroke"
                style={{ animation: "twisting 4s linear infinite alternate" }}>
                {children}
            </path>
        </>
    )
}

function roundTo3Dec(num: number): number {
    return Math.ceil(num * 1000) / 1000;
}

const SIGMA = 600;
const PRE = (1 / Math.sqrt(2 * Math.PI * SIGMA))
function normalDistribution(x: number) {
    return PRE * Math.pow(Math.E, - x * x / 2 / SIGMA)
}


export const Icon: Scene.Module<BeatsMeta>["Icon"] = PlannerReviewIcon;
export const name: Scene.Module<BeatsMeta>["name"] = "Beats";
export const meta: Scene.Module<BeatsMeta>["meta"] = beatsMeta;

export const RawComponent: Scene.Module<BeatsMeta>["RawComponent"] = Beats;
export const Component: Scene.Module<BeatsMeta>["Component"] = (props: Record<string, string>) => {
    return <SceneComponent Component={Beats} meta={meta} {...props} />
}
