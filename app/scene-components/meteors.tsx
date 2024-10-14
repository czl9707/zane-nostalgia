import * as React from "react";

import { MeteorShower as MeteorShowerIcon } from "@/app/ui-components/icons/icons"
import { ColorParamMetaToken, NumberParamMetaToken, SceneMetaData, SceneComponentPropsWithSize, SceneModule } from "./utils/types";


interface MeteroShowerMeta extends SceneMetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    rotation: NumberParamMetaToken,
    density: NumberParamMetaToken,
}

export const SceneIcon: SceneModule["SceneIcon"] = MeteorShowerIcon;
export const name: SceneModule["name"] = "Meteor Shower";
export const meta: SceneModule["meta"] = {
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

function MeteorShower({
    color,
    backgroundColor,
    rotation,
    density,
    height,
    width,
}: SceneComponentPropsWithSize<MeteroShowerMeta>) {
    const realHeight = 500;
    const realWidth = Math.floor(realHeight / height * width);

    const meteorCountY = Math.floor(realHeight * density * 0.01);
    const meteorCountX = Math.floor(realWidth * density * 0.01);


    const meteorAnimationTimeRange = 60;

    const METEORSIZEVARIENTS = 3;
    const METEORINITVARIANTS = Math.floor(meteorAnimationTimeRange / 3);

    return (<svg viewBox={`0 0 ${realWidth} ${realHeight}`} height={`${height}px`} width={`${width}px`}>
        <defs>
            <linearGradient id="tailGradient" gradientTransform={`rotate(0)`}>
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor="transparent" />
            </linearGradient>


            <g id='meteorGeo'>
                <polygon points="0,-1 0,1 300,0" opacity={0.5} fill="url('#tailGradient')" />
                <rect x={-1} y={-1} width={2} height={2} fill={color} />
            </g>

            {
                [...Array(METEORSIZEVARIENTS)].map(((_, i) => (
                    <React.Fragment key={i}>
                        {
                            [...Array(METEORINITVARIANTS)].map(((_, j) => (
                                <g id={`meteor${i}${j}`} key={j}>
                                    <use href="#meteorGeo" transform={`rotate(-${rotation})`} opacity={0.5 + i * 0.2}>
                                        <animate attributeName="x" values="0;-1500" dur={`${meteorAnimationTimeRange * (1 - i * 0.25)}s`}
                                            begin={`-${j * 3}s`} repeatCount="indefinite" />
                                    </use>
                                </g>
                            )))
                        }
                    </React.Fragment>
                )))
            }
        </defs>

        <rect width={`${realWidth}px`} height={`${realHeight}px`} fill={backgroundColor} />
        {
            [...Array(meteorCountX)].map((_, i) => (
                <use x={randomInt(realWidth, 0)} y={randomInt(50, -55)}
                    href={`#meteor${randomInt(METEORSIZEVARIENTS)}${randomInt(METEORINITVARIANTS)}`} key={i} />
            ))
        }
        {
            [...Array(meteorCountY)].map((_, i) => (
                <use x={randomInt(50, rotation <= 90 ? realWidth + 5 : -55)} y={randomInt(realHeight, 0)}
                    href={`#meteor${randomInt(METEORSIZEVARIENTS)}${randomInt(METEORINITVARIANTS)}`} key={i} />
            ))
        }
    </svg>)
}

export const SceneComponent: SceneModule["SceneComponent"] = MeteorShower;

function randomInt(range: number, start: number = 0): number {
    return Math.floor(Math.random() * range + start);
}