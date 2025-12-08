import * as React from "react";
import seedrandom from 'seedrandom';

import { randomFitToInt } from "@/lib/math";
import { Scene } from "./utils/types";
import { CubesMeta, meta } from "./cubes.meta";
import { paramsResolvingWrapper } from "./utils/paramsResolvingWrapper";

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
}: Scene.ComponentProps<CubesMeta>) {
    const randomGenerator = seedrandom(geoSeed);

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
                    20% {transform:translateY(-80px);}
                    40% {transform:translateY(-80px);}
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
                    validBaseList(width, height, vectorRightDown, vecotrLeftDown).map(({ x, y, row, cell }, i) => {
                        return (
                            <use href={`#cube-base`} key={i} x={x} y={y}
                                className={LIFTING_INIT_CLASS(
                                    animateVariant === "random" ?
                                        randomFitToInt(randomGenerator(), 0, LIFTING_DURATION) :
                                        ((row + cell * 2) % LIFTING_DURATION + LIFTING_DURATION) % LIFTING_DURATION
                                )} />
                        )
                    })
                }
            </g>
        </>
    )
}

function validBaseList(width: number, height: number, vecotrRD: { x: number, y: number }, vecotrLD: { x: number, y: number }) {
    const isValid = ({ x, y }: { x: number, y: number }) => -300 <= x && x <= 300 + width && -300 <= y && y <= height + 300;
    const nextRow = (p: { x: number, y: number, row: number, cell: number }) =>
        ({ x: p.x + vecotrRD.x, y: p.y + vecotrRD.y, row: p.row + 1, cell: p.cell });
    const nextCell = (p: { x: number, y: number, row: number, cell: number }) =>
        ({ x: p.x + vecotrLD.x, y: p.y + vecotrLD.y, row: p.row, cell: p.cell + 1 });
    const prevCell = (p: { x: number, y: number, row: number, cell: number }) =>
        ({ x: p.x - vecotrLD.x, y: p.y - vecotrLD.y, row: p.row, cell: p.cell - 1 });
    const result = [];

    let rowHaveValid = true;
    let currentBase = { x: -300, y: -300, row: 0, cell: 0 };
    while (rowHaveValid) {
        rowHaveValid = false;
        while (currentBase.y >= -300) currentBase = prevCell(currentBase);

        let currentP = currentBase;
        while (currentP.y <= height + 300) {
            if (isValid(currentP)) {
                rowHaveValid = true;
                result.push(currentP)
            }
            currentP = nextCell(currentP);
        }
        currentBase = nextRow(currentBase);
    }

    return result;
}


const CubesWrapper = paramsResolvingWrapper(Cubes, meta);
export default CubesWrapper;