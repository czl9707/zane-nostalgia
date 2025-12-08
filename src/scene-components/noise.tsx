import * as React from "react";

import { SvgIcon, type IconProps } from "@/components/ui/icons/icons";
import type { ColorParamMetaToken, NumberParamMetaToken, Scene } from "./utils/types";
import { defaultSceneCommonMetaData, type CommonMetaData } from "./utils/constants";
import { ParamsResolvingWrapper } from "./utils/ParamsResolvingWrapper";


interface NoiseMeta extends CommonMetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    density: NumberParamMetaToken,
    xOffset: NumberParamMetaToken,
    yOffset: NumberParamMetaToken,
}

const noiseMeta: NoiseMeta = {
    ...defaultSceneCommonMetaData,
    color: {
        name: "Color",
        type: "color",
        default: "#1F1F1F",
        group: "Color",
    },
    backgroundColor: {
        name: "Background Color",
        type: "color",
        default: "#000000",
        group: "Color",
    },
    density: {
        name: "Density",
        type: "number",
        default: 5,
        min: 1,
        max: 10,
        step: 1,
        group: "Geometry",
    },
    xOffset: {
        name: "Horizontal Offset",
        type: "number",
        default: 0,
        min: -10,
        max: 10,
        step: 1,
        group: "Geometry",
    },
    yOffset: {
        name: "Vertical Offset",
        type: "number",
        default: 0,
        min: -10,
        max: 10,
        step: 1,
        group: "Geometry",
    }
};

const HeadphoneIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function Headphone(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} >
                <path d="M341.54-140H212.31Q182-140 161-161q-21-21-21-51.31V-480q0-70.77 26.77-132.61 26.77-61.85 72.77-107.85 46-46 107.85-72.77Q409.23-820 480-820q70.77 0 132.61 26.77 61.85 26.77 107.85 72.77 46 46 72.77 107.85Q820-550.77 820-480v267.69Q820-182 799-161q-21 21-51.31 21H618.46v-283.08H760V-480q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480v56.92h141.54V-140Zm-60-223.08H200v150.77q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h69.23v-163.08Zm396.92 0V-200h69.23q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-150.77h-81.54Zm-396.92 0H200h81.54Zm396.92 0H760h-81.54Z" />
            </SvgIcon>
        );
    }
)


const MIN_RADIUS = 100;

function Noise({
    color,
    backgroundColor,
    density,
    xOffset,
    yOffset,
    height,
    width,
}: Scene.RawComponentProps<NoiseMeta>) {
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
                        0% {transform: none;}
                        100% {transform: rotate(900deg);}
                    }
                    .noise-circle {
                        fill: transparent;
                        stroke-width: 50px;
                        stroke: ${color};
                        filter: url(#noise-filter);
                        animation: flashing 1s steps(10, jump-end) infinite;
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

const noiseModule: Scene.ComponentModule<NoiseMeta> = {
    Icon: HeadphoneIcon,
    name: "Noise",
    route: "noise",
    meta: noiseMeta,
    Component: ParamsResolvingWrapper(Noise, noiseMeta),
}

export {
    noiseModule
};
