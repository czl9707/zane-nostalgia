import * as React from "react";

import { IconProps, SvgIcon } from "@/app/ui-components/icons/icons"
import { ColorParamMetaToken, NumberParamMetaToken, SceneComponentProps, SceneMetaData, SceneSizeMetaData, SceneModule } from "./utils/types";
import { defaultSceneSizeMetaData } from "./utils/constants";
import { randomFitToInt, randomMatrix } from "./utils/math-utils";


interface RainyMeta extends SceneMetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    density: NumberParamMetaToken,
}


export const rainyMeta: RainyMeta = {
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

const DROP_TIME = 0.4;
const CYCLE_DURATION = 1.5;
const DENSITY_FACTOR = 0.0002;

function Drops({
    color,
    backgroundColor,
    density,
    height,
    width,
}: SceneComponentProps<RainyMeta & SceneSizeMetaData>) {
    const TIME_INVARIANT = Math.floor((CYCLE_DURATION + DROP_TIME) / 0.1)
    const DROP_COUNT = Math.floor(height * width * Math.pow(density * DENSITY_FACTOR, 2));

    return (<svg viewBox={`0 0 ${width} ${height}`} height={`${height}px`} width={`${width}px`} role="img" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <ellipse id="ripple-geo1" cx="0" cy="0" rx="100" ry="40" fill="none" stroke={color} strokeWidth={1} strokeDasharray="50 20 10 20 100 20" />
            <ellipse id="ripple-geo2" cx="0" cy="0" rx="100" ry="40" fill="none" stroke={color} strokeWidth={1} strokeDasharray="120 20 10 20 40 20" />
            <ellipse id="ripple-geo3" cx="0" cy="0" rx="100" ry="40" fill="none" stroke={color} strokeWidth={1} strokeDasharray="100 20 30 20 80 20" />

            {
                [...Array(TIME_INVARIANT + 2)].map((_, i) => (
                    <use href={`#ripple-geo${i % 3}`} id={`ripple${i}`} key={`rip${i}`} opacity={0}>
                        <animateTransform attributeName="transform" type="scale" id={`ripple-tran${i}`}
                            values="0;3" dur={`${DROP_TIME}s`} begin={`${i / 10}s;ripple-tran${i}.end+${CYCLE_DURATION}s`} fill="freeze" />
                        <animate attributeName="opacity"
                            values="1;0.7;0" dur={`${DROP_TIME}s`} begin={`${i / 10}s;ripple-tran${i}.end+${CYCLE_DURATION}s`} fill="freeze" />
                    </use>
                ))
            }
            {
                [...Array(TIME_INVARIANT)].map((_, i) => (
                    <line stroke={color} strokeWidth={1} id={`drop${i}`} key={`drop${i}`}>
                        <animate attributeName="y1"
                            values="-2000;0;0" dur={`${DROP_TIME}s`} begin={`${i / 10}s;ripple-tran${i}.end+${CYCLE_DURATION}s`} fill="freeze" />
                        <animate attributeName="y2"
                            values="-1500;-500;0" dur={`${DROP_TIME}s`} begin={`${i / 10}s;ripple-tran${i}.end+${CYCLE_DURATION}s`} fill="freeze" />
                    </line>
                ))
            }



        </defs>

        <rect width={`${width}px`} height={`${height}px`} fill={backgroundColor} />
        {
            DROP_PREBUILD.slice(DROP_COUNT).map(([x, y, time], i) => {
                x = randomFitToInt(x, width);
                y = randomFitToInt(y, height);
                time = randomFitToInt(time, TIME_INVARIANT);
                return (
                    <g key={i}>
                        <use href={`#ripple${time}`} x={x} y={y} />
                        <use href={`#ripple${time + 1}`} x={x} y={y} />
                        <use href={`#ripple${time + 2}`} x={x} y={y} />
                        <use href={`#drop${time}`} x={x} y={y} />
                    </g>
                )
            })
        }

    </svg>)
}

const MAX_DROP_COUNT = Math.floor(defaultSceneSizeMetaData.width.max * defaultSceneSizeMetaData.height.max *
    Math.pow(rainyMeta.density.max * DENSITY_FACTOR, 2));
const DROP_PREBUILD = randomMatrix(MAX_DROP_COUNT, 3);


const LightRainyIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function LightRainy(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} >
                <path d="M193.38-493.23q-11.15 5.69-22.8 1.73-11.66-3.96-17.35-15.12l-100-200q-5.69-11.15-1.73-22.8 3.96-11.66 15.12-17.35 11.15-5.69 22.8-1.73 11.66 3.96 17.35 15.12l100 200q5.69 11.15 1.73 22.8-3.96 11.66-15.12 17.35Zm140 280q-11.15 6.08-22.8 1.92-11.66-4.15-17.73-15.31l-80-160q-5.7-11.15-1.54-22.8 4.15-11.66 15.31-17.73 11.15-5.7 22.8-1.54 11.66 4.15 17.35 15.31l80.38 160q5.7 11.15 1.54 22.61-4.15 11.46-15.31 17.54Zm82-200q-11.15 5.69-23 1.73-11.84-3.96-17.53-15.12l-140-280q-5.7-11.15-1.73-22.8 3.96-11.66 15.11-17.35 11.15-6.08 23-1.92 11.85 4.15 17.54 15.31l140 280q5.69 11.15 1.73 22.8-3.96 11.66-15.12 17.35Zm86-200q-11.15 6.08-22.8 2.11-11.66-3.96-17.35-15.11l-39.38-80.39q-5.7-11.15-1.73-23 3.96-11.84 15.11-17.53 11.15-5.7 22.69-1.54 11.54 4.15 17.23 15.31l40 80q5.7 11.15 1.54 22.61-4.15 11.46-15.31 17.54Zm24 399.38q-11.15 6.08-23 2.23-11.84-3.84-17.53-15l-40-80q-5.7-11.15-1.54-23 4.15-11.84 15.31-17.53 11.15-5.7 22.61-1.54 11.46 4.15 17.54 15.31l40.38 79.61q5.7 11.15 1.54 22.5-4.15 11.35-15.31 17.42Zm186 0q-11.15 6.08-22.8 2.23-11.66-3.84-17.35-15l-140-280q-5.69-11.15-1.73-22.8 3.96-11.66 15.12-17.73 11.15-5.7 23-1.54 11.84 4.15 17.53 15.31l140 279.61q5.7 11.15 1.54 22.5-4.15 11.35-15.31 17.42Zm62-239.38q-11.15 6.08-22.8 1.92-11.66-4.15-17.73-15.31l-120-240q-5.7-11.15-1.54-23 4.15-11.84 15.31-17.53 11.15-5.7 22.8-1.54 11.66 4.15 17.35 15.31l120 240q5.69 11.15 1.73 22.8-3.96 11.66-15.12 17.35Zm120 240q-11.15 6.08-22.8 1.92-11.66-4.15-17.73-15.31l-60-120q-5.7-11.15-1.54-23 4.15-11.84 15.31-17.53 11.15-5.7 22.8-1.54 11.66 4.15 17.35 15.31l60 120q5.69 11.15 1.73 22.8-3.96 11.66-15.12 17.35Z" />
            </SvgIcon>
        );
    }
)

export const SceneComponent: SceneModule["SceneComponent"] = Drops;
export const SceneIcon: SceneModule["SceneIcon"] = LightRainyIcon;
export const name: SceneModule["name"] = "Rainy";
export const meta: SceneModule["meta"] = rainyMeta;