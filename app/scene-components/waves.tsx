import * as React from "react";
import { SvgIcon, IconProps } from "../ui-components/icons/icons";
import { randomFitToInt } from "./utils/math-utils";
import { ColorParamMetaToken, NumberParamMetaToken, SceneComponentProps, SceneMetaData, SceneModule, SceneSizeMetaData } from "./utils/types";
import seedrandom from "seedrandom";

interface WavesMeta extends SceneMetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    waveAmount: NumberParamMetaToken,
    waveComplexity: NumberParamMetaToken,
    waveHeight: NumberParamMetaToken,
}


export const wavesMeta: WavesMeta = {
    color: {
        name: "Color",
        type: "color",
        default: "#444444",

        controlOrder: 0,
    },
    backgroundColor: {
        name: "Background Color",
        type: "color",
        default: "#000000",

        controlOrder: 1,
    },
    waveAmount: {
        name: "Waves Amount",
        type: "number",
        default: 5,
        min: 3,
        max: 10,
        step: 1,

        controlOrder: 2,
    },
    waveComplexity: {
        name: "Waves Complexity",
        type: "number",
        default: 3,
        min: 1,
        max: 8,
        step: 1,

        controlOrder: 3,
    },
    waveHeight: {
        name: "Waves Height",
        type: "number",
        default: 50,
        min: 30,
        max: 100,
        step: 5,

        controlOrder: 4,

    }
};

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
}: SceneComponentProps<WavesMeta & SceneSizeMetaData>) {
    const randomGenerator = seedrandom("Waves");
    const WAVE_VERTICAL_DELTA = Math.floor(width / (waveComplexity + 1) / 6);

    return (<svg viewBox={`0 0 ${width} ${height}`} height={`${height}px`} width={`${width}px`} role="img" xmlns="http://www.w3.org/2000/svg">
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

    </svg>)
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


const WaterIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function WaterIcon(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} >
                <path d="M90-255.39v-60.76q34.54-1.93 52.46-20.2 17.93-18.26 71.54-18.26 54.77 0 74.42 20 19.66 20 57.96 20 39.54 0 59.2-20 19.65-20 74.42-20 53.54 0 74.42 20 20.89 20 59.2 20 39.53 0 58.57-20t73.81-20q53.61 0 71.54 18.26 17.92 18.27 52.46 20.2v60.76q-46.62-2.3-67.5-20.77-20.88-18.46-56.5-18.46-37.92 0-57.77 20t-74.61 20q-53.54 0-74.43-20-20.88-20-59.19-20-39.54 0-59.19 20-19.66 20-74.43 20-54.76 0-74-20-19.23-20-58.38-20-37.23 0-56.31 18.46-19.07 18.47-67.69 20.77Zm0-155.38v-60.77q34.54-1.92 52.46-20.19Q160.39-510 214-510q53.54 0 73.81 20 20.27 20 58.57 20 39.54 0 59.2-20 19.65-20 74.42-20 53.54 0 74.12 20 20.57 20 58.26 20 39.54 0 59.2-20 19.65-20 74.42-20 52.38 0 71.54 18.27 19.15 18.27 52.46 20.19v60.77q-47.85-2.31-68.12-20.77Q781.62-450 746-450q-37.92 0-57.77 20t-74.61 20q-53.54 0-74.43-20-20.88-20-59.19-20-39.54 0-58.58 20t-73.8 20q-54.77 0-75.24-20-20.46-20-58.38-20-36 0-56.31 18.46-20.31 18.46-67.69 20.77Zm0-155.38v-60.77q34.54-1.93 52.46-20.19 17.93-18.27 71.54-18.27 53.54 0 73.81 20 20.27 20 58.57 20 39.54 0 59.2-20 19.65-20 74.42-20 53.54 0 74.12 20 20.57 20 58.26 20 39.54 0 59.2-20 19.65-20 74.42-20 52.38 0 71.54 18.27 19.15 18.26 52.46 20.19v60.77q-47.85-2.31-68.12-20.77-20.26-18.47-55.88-18.47-37.92 0-57.77 20t-74.61 20q-53.54 0-74.43-20-20.88-20-59.19-20-39.54 0-58.58 20t-73.8 20q-54.77 0-75.24-20-20.46-20-58.38-20-36 0-56.69 18.47-20.69 18.46-67.31 20.77Z" />
            </SvgIcon>
        );
    }
)


export const SceneComponent: SceneModule["SceneComponent"] = Waves;
export const SceneIcon: SceneModule["SceneIcon"] = WaterIcon;
export const name: SceneModule["name"] = "Waves";
export const meta: SceneModule["meta"] = wavesMeta;