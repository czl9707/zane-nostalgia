"use client"

import * as React from "react";
import seedrandom from "seedrandom";

import { randomFitToInt } from "@/app/components/utils/math-utils";
import { Scene } from "./utils/types";
import { meta, RainyMeta } from "./rainy.meta";
import SceneComponent from "./utils/scene-component";

const DROP_TIME = 0.4;
const CYCLE_DURATION = 1.5;
const DENSITY_FACTOR = 0.0005;

const RIPPLE_CLASS = (timeIndex: number) => `ripple-${timeIndex}`;
const DROP_CLASS = (timeIndex: number) => `drop-${timeIndex}`;

function Rainy({
    color,
    backgroundColor,
    density,
    height,
    width,
    geoSeed,
}: Scene.ComponentProps<RainyMeta & Scene.CommonMetaData>) {
    const TIME_INVARIANT_NUM = Math.floor((CYCLE_DURATION + DROP_TIME) / 0.1)
    const DROP_COUNT = Math.floor(height * width * Math.pow(density * DENSITY_FACTOR, 2));
    const randomGenerator = seedrandom(geoSeed);

    const visitedRippleClasses = new Set();
    const visitedDropClasses = new Set();

    const dropInstances = [...Array(DROP_COUNT)].map((_, i) => {
        const x = randomFitToInt(randomGenerator(), 0, width);
        const y = randomFitToInt(randomGenerator(), 0, height);
        const timeIndex = randomFitToInt(randomGenerator(), 0, TIME_INVARIANT_NUM);

        visitedRippleClasses.add(RIPPLE_CLASS(timeIndex));
        visitedRippleClasses.add(RIPPLE_CLASS(timeIndex + 1));
        visitedRippleClasses.add(RIPPLE_CLASS(timeIndex + 2));
        visitedDropClasses.add(DROP_CLASS(timeIndex));

        return (
            <g key={i}>
                <use href={`#${RIPPLE_CLASS(timeIndex)}`} x={x} y={y} />
                <use href={`#${RIPPLE_CLASS(timeIndex + 1)}`} x={x} y={y} />
                <use href={`#${RIPPLE_CLASS(timeIndex + 2)}`} x={x} y={y} />
                <use href={`#${DROP_CLASS(timeIndex)}`} x={x} y={y} />
            </g>
        )
    });

    return (<>
        <defs>
            <ellipse id="ripple-geo-1" cx="0" cy="0" rx="100" ry="40" fill="none" stroke={color} strokeWidth={1} strokeDasharray="50 20 10 20 100 20" />
            <ellipse id="ripple-geo-2" cx="0" cy="0" rx="100" ry="40" fill="none" stroke={color} strokeWidth={1} strokeDasharray="120 20 10 20 40 20" />
            <ellipse id="ripple-geo-3" cx="0" cy="0" rx="100" ry="40" fill="none" stroke={color} strokeWidth={1} strokeDasharray="100 20 30 20 80 20" />

            {
                [...Array(TIME_INVARIANT_NUM + 2)]
                    .filter((_, i) => visitedRippleClasses.has(RIPPLE_CLASS(i)))
                    .map((_, i) => (
                        <use href={`#ripple-geo-${i % 3}`} id={RIPPLE_CLASS(i)} key={RIPPLE_CLASS(i)} opacity={0}>
                            <animateTransform attributeName="transform" type="scale" id={`ripple-tran${i}`}
                                values="0;3" dur={`${DROP_TIME}s`} begin={`${i / 10}s;ripple-tran${i}.end+${CYCLE_DURATION}s`} fill="freeze" />
                            <animate attributeName="opacity"
                                values="1;0.7;0" dur={`${DROP_TIME}s`} begin={`${i / 10}s;ripple-tran${i}.end+${CYCLE_DURATION}s`} fill="freeze" />
                        </use>
                    ))
            }
            {
                [...Array(TIME_INVARIANT_NUM)]
                    .filter((_, i) => visitedDropClasses.has(DROP_CLASS(i)))
                    .map((_, i) => (
                        <line stroke={color} strokeWidth={1} id={DROP_CLASS(i)} key={DROP_CLASS(i)}>
                            <animate attributeName="y1"
                                values="-2000;0;0" dur={`${DROP_TIME}s`} begin={`${i / 10}s;ripple-tran${i}.end+${CYCLE_DURATION}s`} fill="freeze" />
                            <animate attributeName="y2"
                                values="-1500;-500;0" dur={`${DROP_TIME}s`} begin={`${i / 10}s;ripple-tran${i}.end+${CYCLE_DURATION}s`} fill="freeze" />
                        </line>
                    ))
            }
        </defs>

        <rect width={`${width}px`} height={`${height}px`} fill={backgroundColor} />
        {dropInstances}
    </>)
}


function RainyWrapper(props: Record<string, string>) {
    return (
        <SceneComponent meta={meta} Component={Rainy} {...props} />
    )
}

export const Component: Scene.ComponentModule<RainyMeta>["Component"] = RainyWrapper;
export const RawComponent: Scene.ComponentModule<RainyMeta>["RawComponent"] = Rainy;