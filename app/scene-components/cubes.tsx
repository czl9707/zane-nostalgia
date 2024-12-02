import * as React from "react";
import seedrandom from 'seedrandom';

import { randomFitToInt } from "@/app/components/utils/math-utils";
import { IconProps, SvgIcon } from "@/app/components/ui/icons/icons"
import SceneComponent from "./utils/scene-component";
import { ColorParamMetaToken, EnumParamMetaToken, NumberParamMetaToken, RandomSeedParamMetaToken, Scene } from "./utils/types";


interface CubesMeta extends Scene.MetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    rotation: NumberParamMetaToken,
    animateVariant: EnumParamMetaToken<'random' | 'sequential'>,
    geoSeed: RandomSeedParamMetaToken,
}

const RandomIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function Random(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} >
                <path d="M180-180v-276.15h140V-180H180Zm230 0v-600h140v600H410Zm230 0v-403.84h140V-180H640Z" />
            </SvgIcon>
        );
    }
)
const SequentialIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function Sequential(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} >
                <path d="M180-180v-276.15h140V-180H180Zm230 0v-403.84h140V-180H640Zm230 0v-600h140v600H410Z" />
            </SvgIcon>
        );
    }
)

const meteorMeta: CubesMeta = {
    color: {
        name: "Color",
        type: "color",
        default: "#222222",
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
        default: 0,
        min: -45,
        max: 45,
        step: 5,
        group: "Geometry",
    },
    animateVariant: {
        name: "Animation Variant",
        type: "enum",
        default: "random",
        options: {
            "random": RandomIcon,
            "sequential": SequentialIcon,
        },
        group: "Geometry",
    },
    geoSeed: {
        name: "Random Seed",
        type: "randomSeed",
        default: "Cubes",
        group: "Geometry",
    }
};

const LIFTING_DURATION = 10;
const LIFTING_INIT_VARIANTS = [...Array(LIFTING_DURATION)].map((_, i) => i);
const LIFTING_INIT_CLASS = (initIndex: number) => `lifting-init-${initIndex}`;


function Cubes({
    color,
    backgroundColor,
    rotation,
    animateVariant,
    height,
    width,
    geoSeed,
}: Scene.ComponentProps<CubesMeta & Scene.CommonMetaData>) {
    const cornerX = 150 * Math.sin(rotation * Math.PI / 180);
    const cornerY = 150 * Math.cos(rotation * Math.PI / 180);
    const rectCorners = [
        { x: Math.floor(cornerX), y: Math.floor(cornerY / 2) },
        { x: Math.floor(cornerY), y: Math.floor(-cornerX / 2) },
        { x: Math.floor(-cornerX), y: Math.floor(-cornerY / 2) },
        { x: Math.floor(-cornerY), y: Math.floor(cornerX / 2) },
    ]
    const vectorRightDown = { x: rectCorners[0].x - rectCorners[3].x, y: rectCorners[0].y - rectCorners[3].y };
    const vecotrLeftDown = { x: rectCorners[0].x - rectCorners[1].x, y: rectCorners[0].y - rectCorners[1].y };
    const topRectPath = "M" + rectCorners.map(({ x, y }) => `${x} ${y}`).join("L") + "Z";
    const foots = [rectCorners[0], rectCorners[1], rectCorners[3]].map(({ x, y }) => `M${x} ${y} L${x} ${y + 150}`).join("");
    const backgroundPath = `M${rectCorners[3].x} ${rectCorners[3].y + 150}L${rectCorners[3].x} ${rectCorners[3].y}L${rectCorners[1].x} ${rectCorners[1].y}L${rectCorners[1].x} ${rectCorners[1].y + 150}`;

    return (
        <>
            <style>{`
                @keyframes lifting {
                    0% {transform:translateY(0);}
                    20% {transform:translateY(-10%);}
                    40% {transform:translateY(-10%);}
                    80% {transform:translateY(0);}
                    100% {transform:translateY(0);}
                }
                #cubes>use {
                    animation-name: lifting;
                    animation-iteration-count: infinite;
                    animation-timing-function: ease-in-out;
                    animation-duration: ${LIFTING_DURATION}s;
                }
                ${LIFTING_INIT_VARIANTS.map(
                (init, i) => `.${LIFTING_INIT_CLASS(i)} { animation-delay:-${init}s; }`
            ).join("\n")
                }
            `}
            </style>
            <defs>
                <g id="cube-base" transform="translate(200,200)">
                    <path d={backgroundPath} stroke="none" fill={color} />
                    <path d={topRectPath} stroke={backgroundColor} strokeWidth={2} fill={backgroundColor} />
                    <path d={foots} stroke={backgroundColor} strokeWidth={2} fill="none" />
                </g>
            </defs>
            <rect width={`${width}px`} height={`${height}px`} fill={backgroundColor} />
            <g id="cubes">
                {
                    validBaseList(width, height, vectorRightDown, vecotrLeftDown).map(({ x, y }, i) => (
                        <use href={`#cube-base`} key={i} x={x} y={y} className={LIFTING_INIT_CLASS(i % LIFTING_DURATION)} />
                    ))
                }
            </g>
        </>
    )
}

function validBaseList(width: number, height: number, vecotrRD: { x: number, y: number }, vecotrLD: { x: number, y: number }) {
    const isValid = ({ x, y }: { x: number, y: number }) => -300 <= x && x <= 300 + width && -300 <= y && y <= height + 300;
    const move = (p: { x: number, y: number }, vector: { x: number, y: number }, reverse: boolean = false) =>
        ({ x: p.x + (reverse ? -1 : 1) * vector.x, y: p.y + (reverse ? -1 : 1) * vector.y });
    const result = []

    let rowHaveValid = true;
    let currentBase = { x: -300, y: -300 };
    while (rowHaveValid) {
        rowHaveValid = false;
        while (isValid(currentBase)) currentBase = move(currentBase, vecotrLD, true);
        currentBase = move(currentBase, vecotrLD);

        let currentP = currentBase;
        while (isValid(currentP)) {
            rowHaveValid = true;
            result.push(currentP)
            currentP = move(currentP, vecotrLD);
        }
        currentBase = move(currentBase, vecotrRD);
    }

    return result;
}

const CubeIcon = React.forwardRef<SVGSVGElement, IconProps>(
    function DeployedCode(props, ref) {
        return (
            <SvgIcon {...props} ref={ref} >
                <path d="M450-177.23v-285.54L200-607.54v278.62q0 3.07 1.54 5.77 1.54 2.69 4.61 4.61L450-177.23Zm60 0 243.85-141.31q3.07-1.92 4.61-4.61 1.54-2.7 1.54-5.77v-278.62L510-462.77v285.54Zm-30-337.23 247-142.77-240.85-139.31q-3.07-1.92-6.15-1.92-3.08 0-6.15 1.92L233-657.23l247 142.77ZM176.16-265.85q-17.08-9.84-26.62-26.3-9.54-16.47-9.54-36.16v-303.38q0-19.69 9.54-36.16 9.54-16.46 26.62-26.3l267.69-154.08q17.07-9.85 36.15-9.85t36.15 9.85l267.69 154.08q17.08 9.84 26.62 26.3 9.54 16.47 9.54 36.16v303.38q0 19.69-9.54 36.16-9.54 16.46-26.62 26.3L516.15-111.77q-17.07 9.85-36.15 9.85t-36.15-9.85L176.16-265.85ZM480-480Z" />
            </SvgIcon>
        );
    }
)

export const Icon: Scene.Module<CubesMeta>["Icon"] = CubeIcon;
export const name: Scene.Module<CubesMeta>["name"] = "Cubes";
export const meta: Scene.Module<CubesMeta>["meta"] = meteorMeta;

export const RawComponent: Scene.Module<CubesMeta>["RawComponent"] = Cubes;
export const Component: Scene.Module<CubesMeta>["Component"] = (props: Record<string, string>) => {
    return <SceneComponent Component={Cubes} meta={meta} {...props} />
}
