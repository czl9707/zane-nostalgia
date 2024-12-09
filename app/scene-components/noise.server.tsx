import * as React from "react";

import { meta, NoiseMeta } from "./noise.meta";
import { Scene } from "./utils/types";
import { paramsResolvingWrapper } from "./utils/paramsResolvingWrapper";

const MIN_RADIUS = 100;

function Noise({
    color,
    backgroundColor,
    density,
    xOffset,
    yOffset,
    height,
    width,
}: Scene.ComponentProps<NoiseMeta & Scene.CommonMetaData>) {
    const CENTER_X = width / 2 + Math.floor(width / 2 / 10 * xOffset);
    const CENTER_Y = height / 2 + Math.floor(height / 2 / 10 * yOffset);

    const MAX_RADIUS = Math.floor(Math.sqrt(
        Math.pow(Math.max(CENTER_X, width - CENTER_X), 2) + Math.pow(Math.max(CENTER_Y, width - CENTER_Y), 2)
    ));
    const AMOUNT = Math.ceil((MAX_RADIUS - MIN_RADIUS) / 600) * density;
    const RADIUSES = [...Array(AMOUNT)].map((_, i) => MIN_RADIUS + Math.floor((MAX_RADIUS - MIN_RADIUS) / (AMOUNT - 1) * i));

    return (
        <>
            <style>
                {
                    `
                    @keyframes flashing {
                        from {transform: none;}
                        to {transform: rotate(945deg);}
                    }
                    .noise-circle {
                        fill: transparent;
                        stroke-width: 50px;
                        stroke: ${color};
                        filter: url(#noise-filter);
                        animation: flashing 1s steps(10, jump-both) infinite;
                    }`
                }
            </style>
            <rect width={`${width}px`} height={`${height}px`} fill={backgroundColor} />
            <defs>
                <filter id="noise-filter">
                    <feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="1" result="turbulence">
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" in2="turbulence" xChannelSelector="R" yChannelSelector="G" scale={300} />
                </filter>
            </defs>
            <g transform={`translate(${CENTER_X}, ${CENTER_Y})`}>
                {
                    RADIUSES.map((radius, i) => (
                        <React.Fragment key={i}>
                            <mask id={`circle-mask${i}`}>
                                <circle r={radius} fill="white" />
                            </mask>
                            <circle r={radius} className="noise-circle" mask={`url(#circle-mask${i})`} />
                        </React.Fragment>
                    ))
                }
            </g>
        </>
    );
}

const NoiseWrapper = paramsResolvingWrapper(Noise, meta);
export default NoiseWrapper;