/* eslint @typescript-eslint/no-unused-vars: 0 */  // --> OFF

import * as React from "react";
import seedrandom from "seedrandom";

import { Scene } from "./utils/types";
import { BeatsMeta, meta } from "./beats.meta";
import { paramsResolvingWrapper } from "./utils/paramsResolvingWrapper";
import { randomFitToInt } from "@/lib/math";

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

const BeatsWrapper = paramsResolvingWrapper(Beats, meta);
export default BeatsWrapper;