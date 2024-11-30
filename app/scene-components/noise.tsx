import * as React from "react";

import { IconProps, SvgIcon } from "@/app/components/ui/icons/icons"
import { ColorParamMetaToken, NumberParamMetaToken, Scene } from "./utils/types";
import SceneComponent from "./utils/scene-component";


interface NoiseMeta extends Scene.MetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    density: NumberParamMetaToken,
    xOffset: NumberParamMetaToken,
    yOffset: NumberParamMetaToken,
}

export const NoiseMeta: NoiseMeta = {
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
            <rect width={`${width}px`} height={`${height}px`} fill={backgroundColor} />
            <defs>
                <filter id="noise-filter">
                    <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="3" result="turbulence">
                        <animate attributeName="seed" values={`1;10`} dur={`1s`} repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" in2="turbulence" xChannelSelector="R" yChannelSelector="G" scale={300} />
                </filter>

            </defs>
            {
                RADIUSES.map((radius, i) => (
                    <React.Fragment key={i}>
                        <mask id={`circle-mask${i}`}>
                            <circle r={radius} fill="white" />
                        </mask>
                        <circle r={radius} fill="transparent" strokeWidth={50} stroke={color} filter="url(#noise-filter)"
                            transform={`translate(${CENTER_X}, ${CENTER_Y})`} mask={`url(#circle-mask${i})`} />
                    </React.Fragment>
                ))
            }
        </>
    );
}


const HeadphoneIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function Headphone(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} >
                <path d="M341.54-140H212.31Q182-140 161-161q-21-21-21-51.31V-480q0-70.77 26.77-132.61 26.77-61.85 72.77-107.85 46-46 107.85-72.77Q409.23-820 480-820q70.77 0 132.61 26.77 61.85 26.77 107.85 72.77 46 46 72.77 107.85Q820-550.77 820-480v267.69Q820-182 799-161q-21 21-51.31 21H618.46v-283.08H760V-480q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480v56.92h141.54V-140Zm-60-223.08H200v150.77q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h69.23v-163.08Zm396.92 0V-200h69.23q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-150.77h-81.54Zm-396.92 0H200h81.54Zm396.92 0H760h-81.54Z" />
            </SvgIcon>
        );
    }
)

export const Icon: Scene.Module<NoiseMeta>["Icon"] = HeadphoneIcon;
export const name: Scene.Module<NoiseMeta>["name"] = "Noise";
export const meta: Scene.Module<NoiseMeta>["meta"] = NoiseMeta;

export const RawComponent: Scene.Module<NoiseMeta>["RawComponent"] = Noise;
export const Component: Scene.Module<NoiseMeta>["Component"] = (props: Record<string, string>) => {
    return <SceneComponent Component={Noise} meta={meta} {...props} />
}