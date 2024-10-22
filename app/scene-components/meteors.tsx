import * as React from "react";

import { MeteorShower as MeteorShowerIcon } from "@/app/ui-components/icons/icons"
import { ColorParamMetaToken, NumberParamMetaToken, SceneComponentProps, SceneMetaData, SceneSizeMetaData, SceneModule } from "./utils/types";
import { defaultSceneSizeMetaData } from "./utils/constants";
import { randomFitToInt, randomMatrix } from "./utils/math-utils";


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

const DENSITY_FACTOR = 0.005;
const METEOR_ANIMATION_TIME_RANGE = 60;

function MeteorShower({
    color,
    backgroundColor,
    rotation,
    density,
    height,
    width,
}: SceneComponentProps<MeteroShowerMeta & SceneSizeMetaData>) {
    const meteorCountY = rotation === 90 ? 0 :
        Math.abs(Math.floor(
            height * density * DENSITY_FACTOR * Math.cos(rotation * Math.PI / 180)
        ));
    const meteorCountX = rotation % 180 === 0 ? 0 :
        Math.abs(Math.floor(
            width * density * DENSITY_FACTOR * Math.sin(rotation * Math.PI / 180)
        ));


    const METEOR_SIZE_VARIENTS = 3;
    const METEOR_INIT_VARIANTS = Math.floor(METEOR_ANIMATION_TIME_RANGE / 4);

    return (<svg viewBox={`0 0 ${width} ${height}`} height={`${height}px`} width={`${width}px`} role="img" xmlns="http://www.w3.org/2000/svg">
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
                [...Array(METEOR_SIZE_VARIENTS)].map(((_, i) => (
                    <React.Fragment key={i}>
                        {
                            [...Array(METEOR_INIT_VARIANTS)].map(((_, j) => (
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
                .map(([x, y, size, init], i) => (
                    <use x={randomFitToInt(x, width + 100)} y={randomFitToInt(y, 100, -105)}
                        href={`#meteor${randomFitToInt(size, METEOR_SIZE_VARIENTS)}${randomFitToInt(init, METEOR_INIT_VARIANTS)}`} key={i} />
                ))
        }
        {
            METEOR_PREBUILD.slice(0, meteorCountY)
                .map(([x, y, size, init], i) => (
                    <use x={randomFitToInt(x, 100, rotation <= 90 ? width + 5 : -105)} y={randomFitToInt(y, height)}
                        href={`#meteor${randomFitToInt(size, METEOR_SIZE_VARIENTS)}${randomFitToInt(init, METEOR_INIT_VARIANTS)}`} key={i} />
                ))
        }
    </svg>)
}


const MAX_METEOR_COUNT = Math.floor(defaultSceneSizeMetaData.width.max * meteorMeta.density.max * DENSITY_FACTOR);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const METEOR_PREBUILD = randomMatrix(MAX_METEOR_COUNT, 4);


export const SceneComponent: SceneModule["SceneComponent"] = MeteorShower;
export const SceneIcon: SceneModule["SceneIcon"] = MeteorShowerIcon;
export const name: SceneModule["name"] = "Meteor Shower";
export const meta: SceneModule["meta"] = meteorMeta;