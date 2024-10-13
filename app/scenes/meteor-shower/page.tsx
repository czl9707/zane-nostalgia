"use client"

import React from 'react'

import { DEFAULT_SVG_HEIGHT, DEFAULT_SVG_WIDTH } from '../constants'

interface MeteorShowerProps {
    color?: string,
    backgroundColor?: string,
    rotation?: number,
    density?: number,
    height?: number,
    width?: number,
};

function MeteorShower({
    color = "#888888",
    backgroundColor = "#000000",
    rotation = 45,
    density = 10,
    height = DEFAULT_SVG_HEIGHT,
    width = DEFAULT_SVG_WIDTH,
}: MeteorShowerProps) {
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

function randomInt(range: number, start: number = 0): number {
    return Math.floor(Math.random() * range + start);
}

export default function Page({ searchParams }: { searchParams: { [k in keyof MeteorShowerProps]: string } }) {
    const params: MeteorShowerProps = {};

    for (const key in searchParams) {
        if (["color", "backgroundColor"].includes(key))
            params[key as "color" | "backgroundColor"] = searchParams[key as keyof MeteorShowerProps];
        else if (["rotation", "height", "width", "density"].includes(key))
            params[key as "rotation" | "height" | "width" | "density"] = parseInt(searchParams[key as keyof MeteorShowerProps] as string);
    }

    return <MeteorShower {...params} />
};
export type { MeteorShowerProps };
