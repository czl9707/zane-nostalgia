import React from 'react'
import { DEFAULT_SVG_HEIGHT, DEFAULT_SVG_WIDTH } from '../constants'

interface MeteorShowerProps {
    color?: string,
    backgroundColor?: string,
    rotateDegree?: number,
    dense?: number,
    height?: number,
    width?: number,
}

export default function MeteorShower({
    color = "grey",
    backgroundColor = "black",
    rotateDegree = 45,
    dense = 1,
    height = DEFAULT_SVG_HEIGHT,
    width = DEFAULT_SVG_WIDTH,
}: MeteorShowerProps) {
    const realWidth = Math.floor(500 / height * width);
    const meteorInitRange = realWidth + Math.floor(500 * Math.tan((rotateDegree * Math.PI) / 180));
    const meteorInitRangeStart = rotateDegree > 0 ? 0 : - Math.floor(500 * Math.tan((rotateDegree * Math.PI) / 180));

    const meteorCount = Math.floor(meteorInitRange * dense * 0.1);

    const meteorAnimationTimeRange = 60;

    const METEORSIZEVARIENTS = 3;
    const METEORINITVARIANTS = Math.floor(meteorAnimationTimeRange / 3);

    return (<svg viewBox={`0 0 ${realWidth} 500`} height={`${height}px`} width={`${width}px`}>
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
                                    <use href="#meteorGeo" transform={`rotate(-${rotateDegree})`} opacity={0.5 + i * 0.2}>
                                        <animate attributeName="x" values="0;-1500" dur={`${meteorAnimationTimeRange * (1 - i * 0.25)}s`}
                                            begin={`${j * 3}s`} repeatCount="indefinite" />
                                    </use>
                                </g>
                            )))
                        }
                    </React.Fragment>
                )))
            }
        </defs>

        <rect width={`${realWidth}px`} height="500px" fill={backgroundColor} />
        {
            [...Array(meteorCount)].map((_, i) => (
                <use x={randomInt(meteorInitRange, meteorInitRangeStart)} y={randomInt(50, -55)}
                    href={`#meteor${randomInt(METEORSIZEVARIENTS)}${randomInt(METEORINITVARIANTS)}`} key={i} />
            ))
        }
    </svg>)
}

function randomInt(range: number, start: number = 0): number {
    return Math.floor(Math.random() * range + start);
}
