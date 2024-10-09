import React from 'react'
import { DEFAULT_SVG_HEIGHT, DEFAULT_SVG_WIDTH } from '../constants'

interface MeteorShowerProps {
    color?: string,
    backgroundColor?: string,
    rotateDegree?: number,
    dense?: number,
    height?: number,
    width?: number,
    speed?: number,
}

function MeteorShower({
    color = "white",
    backgroundColor = "black",
    rotateDegree = 45,
    dense = 1,
    height = DEFAULT_SVG_HEIGHT,
    width = DEFAULT_SVG_WIDTH,
    speed = 2,
}: MeteorShowerProps) {
    const real_width = 500 / height * width;
    const amount_per_px = dense * 0.03;

    return (<svg viewBox={`0 0 ${real_width} 500`} height={`${height}px`} width={`${width}px`}>
        <defs>
            <linearGradient id="tailGradient" gradientTransform="rotate(0)">
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor={backgroundColor} />
            </linearGradient>
            <radialGradient id="meteorGradient">
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            <g id='meteorGeo'>
                <circle cx="0" cy="0" r="4" fill="url('#meteorGradient')" />
                <rect y={-0.5} width={300} height={1} opacity={0.6} fill="url('#tailGradient')" />
            </g>

            <g id="meteor1">
                <use href="#meteorGeo" transform={`rotate(-${rotateDegree})`}>
                    <animate attributeName="x" values="0;-1500" dur={`${100 / speed}s`} repeatCount="indefinite" />
                </use>
            </g>
            <g id="meteor2">
                <use href="#meteorGeo" transform={`rotate(-${rotateDegree})`}>
                    <animate attributeName="x" values="0;-1500" dur={`${100 / speed}s`} begin="3s" repeatCount="indefinite" />
                </use>
            </g>
            <g id="meteor3">
                <use href="#meteorGeo" transform={`rotate(-${rotateDegree})`}>
                    <animate attributeName="x" values="0;-1500" dur={`${100 / speed}s`} begin="6s" repeatCount="indefinite" />
                </use>
            </g>
        </defs>

        <rect width={`${real_width}px`} height="500px" fill={backgroundColor} />
        {
            [...Array(Math.floor(amount_per_px * real_width))].map((_, i) => (
                <React.Fragment key={"x" + i}>
                    <use x={Math.random() * (real_width + 500)} y={Math.random() * -50} href="#meteor1" />
                    <use x={Math.random() * (real_width + 500)} y={Math.random() * -50} href="#meteor2" />
                    <use x={Math.random() * (real_width + 500)} y={Math.random() * -50} href="#meteor3" />
                </React.Fragment>
            ))
        }
    </svg>)
}

export default function Page() {
    return <MeteorShower />
}