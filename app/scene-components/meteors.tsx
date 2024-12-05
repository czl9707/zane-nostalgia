"use client"

import * as React from "react";
import seedrandom from 'seedrandom';

import { randomFitToInt } from "@/app/components/utils/math-utils";
import { Scene } from "./utils/types";
import { meta, MeteroShowerMeta } from "./meteors.meta";
import SceneComponent from "./utils/scene-component";


const DENSITY_FACTOR = 0.005;
const METEOR_ANIMATION_TIME_RANGE = 60;

const METEOR_OPACITY_DUR_VARIENTS = [...Array(3)].map((_, i) => ({
    opacity: 0.6 + i * 0.2,
    dur: METEOR_ANIMATION_TIME_RANGE * (1 - i * 0.25)
}));
const METEOR_INIT_VARIANTS = [...Array(METEOR_ANIMATION_TIME_RANGE / 4)].map((_, i) => -i * 4);

const METEOR_CLASS = (durIndex: number, initIndex: number) => `meteor-${durIndex}-${initIndex}`

function MeteorShower({
    color,
    backgroundColor,
    rotation,
    density,
    height,
    width,
    geoSeed,
}: Scene.ComponentProps<MeteroShowerMeta & Scene.CommonMetaData>) {
    const meteorCountY = rotation === 90 ? 0 :
        Math.abs(Math.floor(
            height * density * DENSITY_FACTOR * Math.cos(rotation * Math.PI / 180)
        ));
    const meteorCountX = rotation % 180 === 0 ? 0 :
        Math.abs(Math.floor(
            width * density * DENSITY_FACTOR * Math.sin(rotation * Math.PI / 180)
        ));
    const randomGeneratorX = seedrandom(geoSeed);
    const randomGeneratorY = seedrandom(geoSeed);

    // Ideally should be a tuple, but hashset and array not works good.
    const visitedClass = new Set<string>();

    const meteorInstances = [
        ...[...Array(meteorCountX)].map((_, i) => {
            const x = randomFitToInt(randomGeneratorX(), 0, width + 100);
            const y = randomFitToInt(randomGeneratorX(), -105, 100);
            const durIndex = randomFitToInt(randomGeneratorX(), 0, METEOR_OPACITY_DUR_VARIENTS.length);
            const initIndex = randomFitToInt(randomGeneratorX(), 0, METEOR_INIT_VARIANTS.length);
            visitedClass.add(METEOR_CLASS(durIndex, initIndex));
            return (
                <use x={x} y={y} href={"#" + METEOR_CLASS(durIndex, initIndex)} key={`x-${i}`} />
            )
        })
        ,
        ...
        [...Array(meteorCountY)].map((_, i) => {
            const x = randomFitToInt(randomGeneratorY(), rotation <= 90 ? width + 5 : -105, 100);
            const y = randomFitToInt(randomGeneratorY(), 0, height);
            const durIndex = randomFitToInt(randomGeneratorY(), 0, METEOR_OPACITY_DUR_VARIENTS.length);
            const initIndex = randomFitToInt(randomGeneratorY(), 0, METEOR_INIT_VARIANTS.length);
            visitedClass.add(METEOR_CLASS(durIndex, initIndex));
            return (
                <use x={x} y={y} href={"#" + METEOR_CLASS(durIndex, initIndex)} key={`y-${i}`} />
            )
        })

    ]


    return (<>
        <defs>
            <linearGradient id="tailGradient" gradientTransform={`rotate(0)`}>
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            <g id='meteorGeo'>
                <polygon points="0,-2 0,2 600,0" opacity={0.5} fill="url('#tailGradient')" />
                <rect x={-2} y={-2} width={4} height={4} fill={color} />
            </g>

            {
                METEOR_OPACITY_DUR_VARIENTS
                    .map((({ opacity, dur }, durIndex) => (
                        <React.Fragment key={`DUR${durIndex}`}>
                            {
                                METEOR_INIT_VARIANTS.map(((init, initIndex) => {
                                    return (
                                        <React.Fragment key={`INIT${initIndex}`}>
                                            {
                                                visitedClass.has(METEOR_CLASS(durIndex, initIndex)) &&
                                                <g id={METEOR_CLASS(durIndex, initIndex)}>
                                                    <use href="#meteorGeo" transform={`rotate(-${rotation})`} opacity={opacity}>
                                                        <animate attributeName="x" values={`0;-${height + width}`} dur={`${dur}s`}
                                                            begin={`${init}s`} repeatCount="indefinite" />
                                                    </use>
                                                </g>
                                            }
                                        </React.Fragment>
                                    )
                                }))
                            }
                        </React.Fragment>
                    )))
            }
        </defs>

        <rect width={`${width}px`} height={`${height}px`} fill={backgroundColor} />
        {meteorInstances}
    </>)
}


function MeteorShowerWrapper(props: Record<string, string>) {
    return (
        <SceneComponent meta={meta} Component={MeteorShower} {...props} />
    )
}

export const Component: Scene.ComponentModule<MeteroShowerMeta>["Component"] = MeteorShowerWrapper;
export const RawComponent: Scene.ComponentModule<MeteroShowerMeta>["RawComponent"] = MeteorShower;