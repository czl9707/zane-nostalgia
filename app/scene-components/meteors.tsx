import * as React from "react";
import seedrandom from 'seedrandom';

import { randomFitToInt } from "@/app/components/utils/math-utils";
import { IconProps, SvgIcon } from "@/app/components/ui/icons/icons"
import SceneComponent from "./utils/scene-component";
import { ColorParamMetaToken, NumberParamMetaToken, RandomSeedParamMetaToken, Scene } from "./utils/types";


interface MeteroShowerMeta extends Scene.MetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    rotation: NumberParamMetaToken,
    density: NumberParamMetaToken,
    geoSeed: RandomSeedParamMetaToken,
}


export const meteorMeta: MeteroShowerMeta = {
    color: {
        name: "Color",
        type: "color",
        default: "#ffff00",
        group: "Color",
    },
    backgroundColor: {
        name: "Background Color",
        type: "color",
        default: "#000000",
        group: "Color",
    },
    rotation: {
        name: "Rotation",
        type: "number",
        default: 45,
        min: 0,
        max: 180,
        step: 5,
        group: "Geometry",
    },
    density: {
        name: "Density",
        type: "number",
        default: 10,
        min: 5,
        max: 20,
        step: 1,
        group: "Geometry",
    },
    geoSeed: {
        name: "Random Seed",
        type: "randomSeed",
        default: "MeteorShower",
        group: "Geometry",
    }
};

const DENSITY_FACTOR = 0.005;
const METEOR_ANIMATION_TIME_RANGE = 60;

const METEOR_OPACITY_DUR_VARIENTS = [...Array(3)].map((_, i) => ({
    opacity: 0.6 + i * 0.2,
    dur: METEOR_ANIMATION_TIME_RANGE * (1 - i * 0.25)
}));
const METEOR_INIT_VARIANTS = [...Array(METEOR_ANIMATION_TIME_RANGE / 4)].map((_, i) => -i * 4);

const METEOR_CLASS = (durIndex: number, initIndex: number) => `meteor-${durIndex}-${initIndex}`

function MeteorShower({
    color,
    backgroundColor,
    rotation,
    density,
    height,
    width,
    geoSeed,
}: Scene.ComponentProps<MeteroShowerMeta & Scene.CommonMetaData>) {
    const meteorCountY = rotation === 90 ? 0 :
        Math.abs(Math.floor(
            height * density * DENSITY_FACTOR * Math.cos(rotation * Math.PI / 180)
        ));
    const meteorCountX = rotation % 180 === 0 ? 0 :
        Math.abs(Math.floor(
            width * density * DENSITY_FACTOR * Math.sin(rotation * Math.PI / 180)
        ));
    const randomGeneratorX = seedrandom(geoSeed);
    const randomGeneratorY = seedrandom(geoSeed);

    // Ideally should be a tuple, but hashset and array not works good.
    const visitedClass = new Set<string>();

    const meteorInstances = [
        ...[...Array(meteorCountX)].map((_, i) => {
            const x = randomFitToInt(randomGeneratorX(), 0, width + 100);
            const y = randomFitToInt(randomGeneratorX(), -105, 100);
            const durIndex = randomFitToInt(randomGeneratorX(), 0, METEOR_OPACITY_DUR_VARIENTS.length);
            const initIndex = randomFitToInt(randomGeneratorX(), 0, METEOR_INIT_VARIANTS.length);
            visitedClass.add(METEOR_CLASS(durIndex, initIndex));
            return (
                <use x={x} y={y} href={"#" + METEOR_CLASS(durIndex, initIndex)} key={`x-${i}`} />
            )
        })
        ,
        ...
        [...Array(meteorCountY)].map((_, i) => {
            const x = randomFitToInt(randomGeneratorY(), rotation <= 90 ? width + 5 : -105, 100);
            const y = randomFitToInt(randomGeneratorY(), 0, height);
            const durIndex = randomFitToInt(randomGeneratorY(), 0, METEOR_OPACITY_DUR_VARIENTS.length);
            const initIndex = randomFitToInt(randomGeneratorY(), 0, METEOR_INIT_VARIANTS.length);
            visitedClass.add(METEOR_CLASS(durIndex, initIndex));
            return (
                <use x={x} y={y} href={"#" + METEOR_CLASS(durIndex, initIndex)} key={`y-${i}`} />
            )
        })

    ]


    return (<>
        <defs>
            <linearGradient id="tailGradient" gradientTransform={`rotate(0)`}>
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            <g id='meteorGeo'>
                <polygon points="0,-2 0,2 600,0" opacity={0.5} fill="url('#tailGradient')" />
                <rect x={-2} y={-2} width={4} height={4} fill={color} />
            </g>

            {
                METEOR_OPACITY_DUR_VARIENTS
                    .map((({ opacity, dur }, durIndex) => (
                        <React.Fragment key={`DUR${durIndex}`}>
                            {
                                METEOR_INIT_VARIANTS.map(((init, initIndex) => {
                                    return (
                                        <React.Fragment key={`INIT${initIndex}`}>
                                            {
                                                visitedClass.has(METEOR_CLASS(durIndex, initIndex)) &&
                                                <g id={METEOR_CLASS(durIndex, initIndex)}>
                                                    <use href="#meteorGeo" transform={`rotate(-${rotation})`} opacity={opacity}>
                                                        <animate attributeName="x" values={`0;-${height + width}`} dur={`${dur}s`}
                                                            begin={`${init}s`} repeatCount="indefinite" />
                                                    </use>
                                                </g>
                                            }
                                        </React.Fragment>
                                    )
                                }))
                            }
                        </React.Fragment>
                    )))
            }
        </defs>

        <rect width={`${width}px`} height={`${height}px`} fill={backgroundColor} />
        {meteorInstances}
    </>)
}


const MeteorShowerIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function MeteorShower(props, ref) {
        return (
            <SvgIcon {...props} viewBoxSize='0 0 256 256' style={{ transform: "scale(0.75)" }} ref={ref} >
                <path d="M96 124a36 36 0 1 0 36 36a36 36 0 0 0-36-36m0 48a12 12 0 1 1 12-12a12 12 0 0 1-12 12m128.49-52.49a12 12 0 0 1 0 17l-48 48a12 12 0 0 1-17-17l48-48a12 12 0 0 1 17 0m-36-20a12 12 0 0 1 0 17l-20 20a12 12 0 0 1-17-17l20-20a12 12 0 0 1 17 0m44-27l-16 16a12 12 0 0 1-17-17l16-16a12 12 0 0 1 17 17m-113 15l72-72a12 12 0 0 1 17 17l-72 72a12 12 0 1 1-17-17m30.23 109.26a12 12 0 0 1 0 17A76 76 0 1 1 42.26 106.26L125 23.51a12 12 0 1 1 17 17l-82.77 82.72a52 52 0 0 0 73.54 73.54a12 12 0 0 1 16.97 0Z" />
            </SvgIcon>
        );
    }
)

export const Icon: Scene.Module<MeteroShowerMeta>["Icon"] = MeteorShowerIcon;
export const name: Scene.Module<MeteroShowerMeta>["name"] = "Meteor Shower";
export const meta: Scene.Module<MeteroShowerMeta>["meta"] = meteorMeta;

export const RawComponent: Scene.Module<MeteroShowerMeta>["RawComponent"] = MeteorShower;
export const Component: Scene.Module<MeteroShowerMeta>["Component"] = (props: Record<string, string>) => {
    return <SceneComponent Component={MeteorShower} meta={meta} {...props} />
}
