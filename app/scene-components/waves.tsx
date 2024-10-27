import * as React from "react";
import { SvgIcon, IconProps } from "../ui-components/icons/icons";
import { defaultSceneSizeMetaData } from "./utils/constants";
import { randomFitToInt, randomMatrix } from "./utils/math-utils";
import { ColorParamMetaToken, NumberParamMetaToken, SceneComponentProps, SceneMetaData, SceneModule, SceneSizeMetaData } from "./utils/types";

interface WavesMeta extends SceneMetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    density: NumberParamMetaToken,
}


export const wavesMeta: WavesMeta = {
    color: {
        name: "Color",
        type: "color",
        default: "#0082ad",

        controlOrder: 0,
    },
    backgroundColor: {
        name: "Background Color",
        type: "color",
        default: "#000000",

        controlOrder: 1,
    },
    density: {
        name: "Density",
        type: "number",
        default: 12,
        min: 5,
        max: 20,
        step: 1,

        controlOrder: 3,
    },
};


const DENSITY_FACTOR = 0.0015;
const WAVE_WIDTH = 150;
const SPEED_UNIT_VARIENT = [1, 1.4, 1.8, 2.2];
const OPACITY_VARIENT = [0.6, 0.8, 1];
const SCALE_VARIENT = [1, 1.3, 1.4];


function Wave({
    color,
    backgroundColor,
    density,
    height,
    width,
}: SceneComponentProps<WavesMeta & SceneSizeMetaData>) {
    const ROW_LENGTH = Math.ceil(width / WAVE_WIDTH) + 1;
    const ROW_COUNT = Math.floor(height * density * DENSITY_FACTOR);
    const ROW_HEIGHT = Math.floor(height / ROW_COUNT)

    return (<svg viewBox={`0 0 ${width} ${height}`} height={`${height}px`} width={`${width}px`} role="img" xmlns="http://www.w3.org/2000/svg">
        <style>
            {
                `@keyframes flowing { 
                    from {transform: translateX(${(ROW_LENGTH - 1) * WAVE_WIDTH}px);} 
                    to {transform: translateX(-${WAVE_WIDTH}px);} 
                }
                @keyframes floating { from {transform: none;} to {transform: translateY(-20px);} }`
                +
                SPEED_UNIT_VARIENT.map((unit, i) => {
                    return [...Array(ROW_LENGTH)].map((_, j) => `.wave${i}${j} {animation: flowing ${unit * (ROW_LENGTH)}s linear -${unit * j}s infinite;}`).join('\n')
                }).join('\n')
                +
                `
                    .wave path { transition: all .4s ease-out; animation-delay: inherit; }
                    .wave path:nth-child(1) {
                        d: path("M151 90.0004C142.308 90.0004 137.036 87.1304 133.949 83.0001C126.028 72.4006 132.5 53.5001 132.5 53.5001C132.5 53.5001 120.829 59.4171 103 66.4863C76.5486 76.975 36.544 90.0004 1 90.0004");
                        stroke: ${color};
                        fill: none;
                    }
                    .wave:hover path:nth-child(1) {
                        d: path("M151 89.5008C98.0001 89.5008 78.4995 54 51.5001 54C24.5007 54 26.0001 74.4999 26.0001 74.4999C26.0001 74.4999 37.8582 64.4999 42.5007 74.4999C46.2147 82.4999 35 89.5008 1 89.5008");
                    }
                    .wave path:nth-child(2) {
                        d: path("M151 220V90.0003C142.308 90.0003 137.036 87.1303 133.949 83C126.028 72.4005 132.5 53.5 132.5 53.5C132.5 53.5 120.829 59.417 103 66.4862C76.5486 76.9749 36.544 90.0003 1 90.0003V220");
                        fill: url('#tailGradient');
                        opacity: 0.3;
                    }
                    .wave:hover path:nth-child(2) {
                        d: path("M151 219.501V89.5008C97.9998 89.5008 78.4991 54 51.4998 54C24.5004 54 25.9998 74.4999 25.9998 74.4999C25.9998 74.4999 37.8579 64.4999 42.5004 74.4999C46.2144 82.4999 34.9997 89.5008 0.999634 89.5008V219.501");
                    }
                `
            }
        </style>
        <defs>
            <linearGradient id="tailGradient" gradientUnits="userSpaceOnUse"
                x1="0" y1="40" x2="0" y2="200">
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor="transparent" />
            </linearGradient>
        </defs>

        <rect width={`${width}px`} height={`${height}px`} fill={backgroundColor} />

        {
            rowPrebuild.slice(0, ROW_COUNT)
                .map(([yI, scaleI, opacityI, speedI], i) => {
                    const scale = SCALE_VARIENT[randomFitToInt(scaleI, SCALE_VARIENT.length)];
                    const opacity = OPACITY_VARIENT[randomFitToInt(opacityI, OPACITY_VARIENT.length)];
                    const speed = randomFitToInt(speedI, SPEED_UNIT_VARIENT.length);
                    const y = ROW_HEIGHT * i + randomFitToInt(yI, ROW_HEIGHT, - ROW_HEIGHT / 2) - 100;
                    const x = -randomFitToInt(yI, WAVE_WIDTH);

                    return (
                        <g style={{ animation: `floating 4s ease-in-out ${yI * 4}s infinite alternate` }} key={i}>
                            <g transform={`translate(${x},${y}) scale(${scale}, 1)`} opacity={opacity} >
                                {
                                    [...Array(ROW_LENGTH)].map((_, c) => (
                                        <g key={c} className={`wave wave${speed}${ROW_LENGTH - c - 1}`}>
                                            <path /><path />
                                        </g>
                                    ))
                                }
                            </g>
                        </g>
                    )
                }
                )
        }

    </svg>)
}

const MAX_ROW_COUNT = Math.floor(defaultSceneSizeMetaData.height.max * wavesMeta.density.max * DENSITY_FACTOR);
const rowPrebuild = randomMatrix(MAX_ROW_COUNT, 4);

const WaterIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function WaterIcon(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} >
                <path d="M90-255.39v-60.76q34.54-1.93 52.46-20.2 17.93-18.26 71.54-18.26 54.77 0 74.42 20 19.66 20 57.96 20 39.54 0 59.2-20 19.65-20 74.42-20 53.54 0 74.42 20 20.89 20 59.2 20 39.53 0 58.57-20t73.81-20q53.61 0 71.54 18.26 17.92 18.27 52.46 20.2v60.76q-46.62-2.3-67.5-20.77-20.88-18.46-56.5-18.46-37.92 0-57.77 20t-74.61 20q-53.54 0-74.43-20-20.88-20-59.19-20-39.54 0-59.19 20-19.66 20-74.43 20-54.76 0-74-20-19.23-20-58.38-20-37.23 0-56.31 18.46-19.07 18.47-67.69 20.77Zm0-155.38v-60.77q34.54-1.92 52.46-20.19Q160.39-510 214-510q53.54 0 73.81 20 20.27 20 58.57 20 39.54 0 59.2-20 19.65-20 74.42-20 53.54 0 74.12 20 20.57 20 58.26 20 39.54 0 59.2-20 19.65-20 74.42-20 52.38 0 71.54 18.27 19.15 18.27 52.46 20.19v60.77q-47.85-2.31-68.12-20.77Q781.62-450 746-450q-37.92 0-57.77 20t-74.61 20q-53.54 0-74.43-20-20.88-20-59.19-20-39.54 0-58.58 20t-73.8 20q-54.77 0-75.24-20-20.46-20-58.38-20-36 0-56.31 18.46-20.31 18.46-67.69 20.77Zm0-155.38v-60.77q34.54-1.93 52.46-20.19 17.93-18.27 71.54-18.27 53.54 0 73.81 20 20.27 20 58.57 20 39.54 0 59.2-20 19.65-20 74.42-20 53.54 0 74.12 20 20.57 20 58.26 20 39.54 0 59.2-20 19.65-20 74.42-20 52.38 0 71.54 18.27 19.15 18.26 52.46 20.19v60.77q-47.85-2.31-68.12-20.77-20.26-18.47-55.88-18.47-37.92 0-57.77 20t-74.61 20q-53.54 0-74.43-20-20.88-20-59.19-20-39.54 0-58.58 20t-73.8 20q-54.77 0-75.24-20-20.46-20-58.38-20-36 0-56.69 18.47-20.69 18.46-67.31 20.77Z" />
            </SvgIcon>
        );
    }
)


export const SceneComponent: SceneModule["SceneComponent"] = Wave;
export const SceneIcon: SceneModule["SceneIcon"] = WaterIcon;
export const name: SceneModule["name"] = "Waves";
export const meta: SceneModule["meta"] = wavesMeta;