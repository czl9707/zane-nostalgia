"use client"

import * as React from "react";
import seedrandom from "seedrandom";

import { randomFitToInt } from "@/app/components/utils/math-utils";
import { Scene } from "./utils/types";
import { meta, WavesMeta } from "./waves.meta";
import SceneComponent from "./utils/scene-component";

const WAVE_ANIMATION_STEP = 4;
const WAVE_ANIMATION_CYCLE = 6;

function Waves({
    color,
    backgroundColor,
    waveAmount,
    waveComplexity,
    waveHeight,
    height,
    width,
    geoSeed,
}: Scene.ComponentProps<WavesMeta & Scene.CommonMetaData>) {
    const randomGenerator = seedrandom(geoSeed);
    const WAVE_VERTICAL_DELTA = Math.floor(width / (waveComplexity + 1) / 6);

    return (<>
        <rect width={`${width}px`} height={`${height}px`} fill={backgroundColor} />
        <linearGradient id="waveGradient"
            gradientUnits="userSpaceOnUse"
            x1="0" y1="0" x2="0" y2="250">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="transparent" />
        </linearGradient>

        {
            [...Array(waveAmount)].map(
                (_, i) => Math.floor(height - height * waveHeight / 100 / (waveAmount + 1) * (waveAmount - i))
            ).map(
                (baseHeight, i) => {
                    const nodes = [...Array(WAVE_ANIMATION_STEP)].map(() => generateNodes(randomGenerator, waveComplexity, width, WAVE_VERTICAL_DELTA))
                    const commonPaths = nodes.map(ns => generateCommonPath(ns));
                    const begin = -randomFitToInt(randomGenerator(), 0, WAVE_ANIMATION_CYCLE);
                    return (
                        <React.Fragment key={i}>
                            <g transform={`translate(0, ${baseHeight})`}>
                                <path fill="url('#waveGradient')" stroke="none" opacity={.3}>
                                    <animate attributeName="d" values={[...commonPaths, commonPaths[0]].map(p => `M0 ${height} L ${p} L ${width} ${height} Z`).join(";")}
                                        dur={`${WAVE_ANIMATION_CYCLE}s`} repeatCount="indefinite" begin={begin} />
                                </path>
                                <path fill="none" stroke={color}>
                                    <animate attributeName="d" values={[...commonPaths, commonPaths[0]].map(p => `M ${p}`).join(";")}
                                        dur={`${WAVE_ANIMATION_CYCLE}s`} repeatCount="indefinite" begin={begin} />
                                </path>
                            </g>
                        </React.Fragment>
                    )
                }
            )
        }

    </>)
}

// nodeNum is the number of nodes excluding two ends
function generateNodes(randomGenerator: seedrandom.PRNG, nodeNum: number, width: number, verticalDelta: number): { x: number, y: number }[] {
    const widthUnit = Math.floor(width / (nodeNum + 1))
    const horizontalDelta = Math.floor(width / (nodeNum + 1) / 3);

    const nodes = [...Array(nodeNum + 2)].map((_, i) => ({
        x: widthUnit * i + randomFitToInt(randomGenerator(), -horizontalDelta, 2 * horizontalDelta),
        y: randomFitToInt(randomGenerator(), -verticalDelta, 2 * verticalDelta),
    }));
    nodes[0].x = 0;
    nodes[nodes.length - 1].x = width;

    return nodes;
}

function generateCommonPath(nodes: { x: number, y: number }[]): string {
    const segments: string[] = [];
    for (let i = 0; i < nodes.length - 1; i++) {
        const node1 = nodes[i];
        const node2 = nodes[i + 1];
        const d = Math.floor((node2.x - node1.x) * 0.4);
        segments.push(`C ${node1.x + d} ${node1.y}, ${node2.x - d} ${node2.y}, ${node2.x} ${node2.y}`)
    }

    return `0 ${nodes[0].y}` + segments.join(" ");
}

export default function WavesWrapper(props: Record<string, string>) {
    return (
        <SceneComponent meta={meta} Component={Waves} {...props} />
    )
}

export const Component: Scene.ComponentModule<WavesMeta>["Component"] = WavesWrapper;
export const RawComponent: Scene.ComponentModule<WavesMeta>["RawComponent"] = Waves;