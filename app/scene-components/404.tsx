import { Error as ErrorIcon } from "../ui-components/icons/icons";
import { defaultSceneSizeMetaData } from "./utils/constants";
import { randomFitToInt, randomMatrix } from "./utils/math-utils";
import { ColorParamMetaToken, NumberParamMetaToken, SceneComponentProps, SceneMetaData, SceneModule, SceneSizeMetaData } from "./utils/types";

interface FourOFourMeta extends SceneMetaData {
    color: ColorParamMetaToken,
    backgroundColor: ColorParamMetaToken,
    density: NumberParamMetaToken,
}


export const fourOFourMeta: FourOFourMeta = {
    color: {
        name: "Color",
        type: "color",
        default: "#940000",

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
        default: 6,
        min: 2,
        max: 10,
        step: 1,

        controlOrder: 3,
    },
};

const DENSITY_FACTOR = 0.0007;

const BLINK_SIZE_VARIANTS = 10;
const BLINK_DUR_VARIANTS = 3;
const BLINK_INIT_VARIANTS = 10;


function FourOFour({
    color,
    backgroundColor,
    density,
    height,
    width,
}: SceneComponentProps<FourOFourMeta & SceneSizeMetaData>) {
    const textCount = Math.floor(height * width * Math.pow(density * DENSITY_FACTOR, 2));

    return (<svg viewBox={`0 0 ${width} ${height}`} height={`${height}px`} width={`${width}px`} role="img" xmlns="http://www.w3.org/2000/svg">
        <style>
            {
                `
                @keyframes blink {
                    0% {opacity:0;}
                    30% {opacity:0;}
                    100% {opacity:1;}
                }
                text {
                    fill: ${color};
                    stroke-width: 1px;
                    font: bold 1em var(--serious-font-family);
                    animation-name: blink;
                    animation-direction: alternate;
                    animation-iteration-count: infinite;
                }
                `
                +
                [...Array(BLINK_DUR_VARIANTS)]
                    .map((_, i) => `.blink-dur-${i} { animation-duration:${3 + 3 * i}s; }`)
                    .join("\n")
                + '\n' +
                [...Array(BLINK_INIT_VARIANTS)]
                    .map((_, i) => `.blink-init-${i} { animation-delay:-${3 * i}s; }`)
                    .join("\n")
                + '\n' +
                [...Array(BLINK_SIZE_VARIANTS)]
                    .map((_, i) => `.blink-size-${i} { font-size:${16 + 16 * i}px; }`)
                    .join("\n")
            }
        </style>
        <rect width={`${width}px`} height={`${height}px`} fill={backgroundColor} />


        {
            TEXT_PREBUILD.slice(0, textCount).map(([x, y, size, dur, delay], i) => {
                return (
                    <text key={i} x={randomFitToInt(x, width)} y={randomFitToInt(y, height)}
                        className={[
                            `blink-dur-${randomFitToInt(dur, BLINK_DUR_VARIANTS)}`,
                            `blink-size-${randomFitToInt(size, BLINK_SIZE_VARIANTS)}`,
                            `blink-init-${randomFitToInt(delay, BLINK_INIT_VARIANTS)}`,
                        ].join(" ")}
                    >
                        404</text>
                )
            })
        }

    </svg>)
}

const MAX_TEXT_COUNT = Math.floor(defaultSceneSizeMetaData.width.max * defaultSceneSizeMetaData.height.max *
    Math.pow(fourOFourMeta.density.max * DENSITY_FACTOR, 2));
const TEXT_PREBUILD = randomMatrix(MAX_TEXT_COUNT, 5);


export const SceneComponent: SceneModule["SceneComponent"] = FourOFour;
export const SceneIcon: SceneModule["SceneIcon"] = ErrorIcon;
export const name: SceneModule["name"] = "404";
export const meta: SceneModule["meta"] = fourOFourMeta;