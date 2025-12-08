import { Error as ErrorIcon } from "@/components/ui/icons/icons";
import type { ColorParamMetaToken, StringParamMetaToken, NumberParamMetaToken, RandomSeedParamMetaToken, Scene } from "./utils/types";
import { defaultSceneCommonMetaData, type CommonMetaData } from "./utils/constants";
import seedrandom from 'seedrandom';
import { randomFitToInt, simpleHash } from "@/lib/math";
import React from "react";
import { ParamsResolvingWrapper } from "./utils/ParamsResolvingWrapper";

interface FourOFourMeta extends CommonMetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    density: NumberParamMetaToken,
    textContent: StringParamMetaToken,
    geoSeed: RandomSeedParamMetaToken,
}

const fourOFourMeta: FourOFourMeta = {
    ...defaultSceneCommonMetaData,
    color: {
        name: "Color",
        type: "color",
        default: "#220000",
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
        default: 6,
        min: 2,
        max: 10,
        step: 1,
        group: "Geometry",
    },
    textContent: {
        name: "Content",
        type: "string",
        default: "404",
        group: "Geometry",
    },
    geoSeed: {
        name: "Random Seed",
        type: "randomSeed",
        default: "FourOFour",
        group: "Geometry",
    }
};


const DENSITY_FACTOR = 0.0007;

const BLINK_SIZE_VARIANTS = [...Array(10)].map((_, i) => 16 + 16 * i);
const BLINK_DUR_VARIANTS = [...Array(3)].map((_, i) => 3 * i + 3);
const BLINK_INIT_VARIANTS = [...Array(10)].map((_, i) => 3 * i);

const BLINK_SIZE_CLASS = (sizeIndex: number) => `blink-size-${sizeIndex}`;
const BLINK_DUR_CLASS = (durIndex: number) => `blink-dur-${durIndex}`;
const BLINK_INIT_CLASS = (initIndex: number) => `blink-init-${initIndex}`;

function FourOFour({
    color,
    backgroundColor,
    density,
    height,
    width,
    geoSeed,
    textContent,
}: Scene.RawComponentProps<FourOFourMeta>) {
    const textCount = Math.floor(height * width * Math.pow(density * DENSITY_FACTOR, 2));
    const randomGenerator = seedrandom(geoSeed);
    const contentHash = simpleHash(textContent as string);

    const visitedDurClass = new Set();
    const visitedSizeClass = new Set();
    const visitedInitClass = new Set();

    const textEls = [...Array(textCount)].map((_, i) => {
        const dur = randomFitToInt(randomGenerator(), 0, BLINK_DUR_VARIANTS.length);
        const size = randomFitToInt(randomGenerator(), 0, BLINK_SIZE_VARIANTS.length);
        const init = randomFitToInt(randomGenerator(), 0, BLINK_INIT_VARIANTS.length);
        visitedDurClass.add(BLINK_DUR_CLASS(dur));
        visitedSizeClass.add(BLINK_SIZE_CLASS(size));
        visitedInitClass.add(BLINK_INIT_CLASS(init));

        return (
            <use href={`#content-${contentHash}`} key={i} x={randomFitToInt(randomGenerator(), 0, width)} y={randomFitToInt(randomGenerator(), 0, height)}
                className={["blink", `blink-dur-${dur}`, `blink-size-${size}`, `blink-init-${init}`,].join(" ")} />
        )
    });

    return (<>
        <style>
            {
                `
                @keyframes blink {
                    0% {opacity:0;}
                    30% {opacity:0;}
                    100% {opacity:1;}
                }
                .blink {
                    animation-name: blink;
                    animation-direction: alternate;
                    animation-iteration-count: infinite;
                }`
                +
                BLINK_DUR_VARIANTS
                    .filter((_, i) => visitedDurClass.has(BLINK_DUR_CLASS(i)))
                    .map(
                        (dur, i) => `.${BLINK_DUR_CLASS(i)} { animation-duration:${dur}s; }`
                    ).join("\n")
                + '\n' +
                BLINK_INIT_VARIANTS
                    .filter((_, i) => visitedInitClass.has(BLINK_INIT_CLASS(i)))
                    .map(
                        (init, i) => `.${BLINK_INIT_CLASS(i)} { animation-delay:-${init}s; }`
                    ).join("\n")
                + '\n' +
                BLINK_SIZE_VARIANTS
                    .filter((_, i) => visitedSizeClass.has(BLINK_SIZE_CLASS(i)))
                    .map(
                        (size, i) => `.${BLINK_SIZE_CLASS(i)} { font-size:${size}px; }`
                    ).join("\n")
            }
        </style>
        <rect width={`${width}px`} height={`${height}px`} fill={backgroundColor} />
        <defs>
            <text id={`content-${contentHash}`} style={{ fill: color }}>
                {textContent}
            </text>
        </defs>
        {textEls}
    </>)
}

const fourOFourModule: Scene.ComponentModule<FourOFourMeta> = {
    Icon: ErrorIcon,
    name: "404",
    route: "404",
    meta: fourOFourMeta,
    Component: ParamsResolvingWrapper(FourOFour, fourOFourMeta),
}

export {
    fourOFourModule
};