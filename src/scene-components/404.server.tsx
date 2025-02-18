import seedrandom from 'seedrandom';
import { randomFitToInt, simpleHash } from "@/lib/math";

import { FourOFourMeta, meta } from './404.meta'
import { Scene } from './utils/types';
import { paramsResolvingWrapper } from './utils/paramsResolvingWrapper';

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
}: Scene.ComponentProps<FourOFourMeta & Scene.CommonMetaData>) {
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
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
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


const FourOFourWrapper = paramsResolvingWrapper(FourOFour, meta);
export default FourOFourWrapper;