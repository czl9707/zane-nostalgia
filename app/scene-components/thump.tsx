import * as React from "react";

import { IconProps, SvgIcon } from "@/app/components/ui/icons/icons"
import { ColorParamMetaToken, NumberParamMetaToken, Scene } from "./utils/types";
import SceneComponent from "./utils/scene-component";


interface ThumpMeta extends Scene.MetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    density: NumberParamMetaToken,
    frequency: NumberParamMetaToken,
}

export const thumpMeta: ThumpMeta = {
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
    frequency: {
        name: "Frequency",
        type: "number",
        default: 5,
        min: 1,
        max: 20,
        step: 1,
        group: "Geometry",
    }
};

const MIN_RADIUS = 100;

function Thump({
    color,
    backgroundColor,
    density,
    frequency,
    height,
    width,
}: Scene.ComponentProps<ThumpMeta & Scene.CommonMetaData>) {
    const MAX_RADIUS = Math.floor(Math.sqrt(height * height / 4 + width * width / 4));
    const AMOUNT = Math.ceil((MAX_RADIUS - MIN_RADIUS) / 600) * density;
    const RADIUSES = [...Array(AMOUNT)].map((_, i) => MIN_RADIUS + (MAX_RADIUS - MIN_RADIUS) / (AMOUNT - 1) * i);

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
                            transform={`translate(${width / 2}, ${height / 2})`} mask={`url(#circle-mask${i})`} />
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

export const Icon: Scene.Module<ThumpMeta>["Icon"] = HeadphoneIcon;
export const name: Scene.Module<ThumpMeta>["name"] = "Thump";
export const meta: Scene.Module<ThumpMeta>["meta"] = thumpMeta;

export const RawComponent: Scene.Module<ThumpMeta>["RawComponent"] = Thump;
export const Component: Scene.Module<ThumpMeta>["Component"] = (props: Record<string, string>) => {
    return <SceneComponent Component={Thump} meta={meta} {...props} />
}
