import * as React from "react";

import { MeteorShower as MeteorShowerIcon } from "@/app/ui-components/icons/icons"
import { ColorParamMetaToken, NumberParamMetaToken, SceneMetaData, SceneComponentPropsWithSize, SceneModule } from "./utils/types";
import { defaultSceneSizeMetaData } from "./utils/constants";


interface MeteroShowerMeta extends SceneMetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    rotation: NumberParamMetaToken,
    density: NumberParamMetaToken,
}


export const meteorMeta: MeteroShowerMeta = {
    color: {
        name: "Color",
        type: "color",
        default: "#888888",

        controlOrder: 0,
    },
    backgroundColor: {
        name: "Background Color",
        type: "color",
        default: "#000000",

        controlOrder: 1,
    },
    rotation: {
        name: "Rotation",
        type: "number",
        default: 45,
        min: 0,
        max: 180,
        step: 5,

        controlOrder: 2,
    },
    density: {
        name: "Density",
        type: "number",
        default: 10,
        min: 5,
        max: 20,
        step: 1,

        controlOrder: 3,
    },
};

const METEOR_DENSITY_FACTOR = 0.005;
const METEOR_ANIMATION_TIME_RANGE = 60;

function MeteorShower({
    color,
    backgroundColor,
    rotation,
    density,
    height,
    width,
}: SceneComponentPropsWithSize<MeteroShowerMeta>) {
    const meteorCountY = rotation === 90 ? 0 :
        Math.abs(Math.floor(
            height * density * METEOR_DENSITY_FACTOR * Math.cos(rotation * Math.PI / 180)
        ));
    const meteorCountX = rotation % 180 === 0 ? 0 :
        Math.abs(Math.floor(
            width * density * METEOR_DENSITY_FACTOR * Math.sin(rotation * Math.PI / 180)
        ));


    const METEORSIZEVARIENTS = 3;
    const METEORINITVARIANTS = Math.floor(METEOR_ANIMATION_TIME_RANGE / 4);

    return (<svg viewBox={`0 0 ${width} ${height}`} height={`${height}px`} width={`${width}px`}>
        <style>
            {
                `
use {animation: fadeInAnimation 0.8s ease-in-out forwards;}

@keyframes fadeInAnimation {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}`
            }
        </style>
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
                [...Array(METEORSIZEVARIENTS)].map(((_, i) => (
                    <React.Fragment key={i}>
                        {
                            [...Array(METEORINITVARIANTS)].map(((_, j) => (
                                <g id={`meteor${i}${j}`} key={j}>
                                    <use href="#meteorGeo" transform={`rotate(-${rotation})`} opacity={0.5 + i * 0.2}>
                                        <animate attributeName="x" values={`0;-${height + width}`} dur={`${METEOR_ANIMATION_TIME_RANGE * (1 - i * 0.25)}s`}
                                            begin={`-${j * 4}s`} repeatCount="indefinite" />
                                    </use>
                                </g>
                            )))
                        }
                    </React.Fragment>
                )))
            }
        </defs>

        <rect width={`${width}px`} height={`${height}px`} fill={backgroundColor} />
        {
            METEOR_PREBUILD.slice(0, meteorCountX)
                .map(([x, y, a, b], i) => (
                    <use x={toInt(x, width)} y={toInt(y, 100, -105)}
                        href={`#meteor${toInt(a, METEORSIZEVARIENTS)}${toInt(b, METEORINITVARIANTS)}`} key={i} />
                ))
        }
        {
            METEOR_PREBUILD.slice(0, meteorCountY)
                .map(([x, y, a, b], i) => (
                    <use x={toInt(x, 100, rotation <= 90 ? width + 5 : -105)} y={toInt(y, height)}
                        href={`#meteor${toInt(a, METEORSIZEVARIENTS)}${toInt(b, METEORINITVARIANTS)}`} key={i} />
                ))
        }
    </svg>)
}



function toInt(num: number, range: number, start: number = 0): number {
    return Math.floor(num * range + start);
}

const MAX_METEOR_COUNT = Math.floor(defaultSceneSizeMetaData.width.max * meteorMeta.density.max * METEOR_DENSITY_FACTOR);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const METEOR_PREBUILD = [...Array(MAX_METEOR_COUNT)].map((_) => [Math.random(), Math.random(), Math.random(), Math.random()])


export const SceneComponent: SceneModule["SceneComponent"] = MeteorShower;
export const SceneIcon: SceneModule["SceneIcon"] = MeteorShowerIcon;
export const name: SceneModule["name"] = "Meteor Shower";
export const meta: SceneModule["meta"] = meteorMeta;