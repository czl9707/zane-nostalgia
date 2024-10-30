import { Error as ErrorIcon } from "../ui-components/icons/icons";
import { randomFitToInt } from "./utils/math-utils";
import { ColorParamMetaToken, NumberParamMetaToken, SceneComponentProps, SceneMetaData, SceneModule, SceneSizeMetaData } from "./utils/types";
import seedrandom from 'seedrandom';


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

const BLINK_SIZE_VARIANTS = [...Array(10)].map((_, i) => 16 + 16 * i);
const BLINK_DUR_VARIANTS = [...Array(3)].map((_, i) => 3 * i + 3);
const BLINK_INIT_VARIANTS = [...Array(10)].map((_, i) => 3 * i);


function FourOFour({
    color,
    backgroundColor,
    density,
    height,
    width,
}: SceneComponentProps<FourOFourMeta & SceneSizeMetaData>) {
    const textCount = Math.floor(height * width * Math.pow(density * DENSITY_FACTOR, 2));
    const randomGenerator = seedrandom("FourOFour");

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
                BLINK_DUR_VARIANTS.map(
                    (dur, i) => `.blink-dur-${i} { animation-duration:${dur}s; }`
                ).join("\n")
                + '\n' +
                BLINK_INIT_VARIANTS.map(
                    (init, i) => `.blink-init-${i} { animation-delay:-${init}s; }`
                ).join("\n")
                + '\n' +
                BLINK_SIZE_VARIANTS.map(
                    (size, i) => `.blink-size-${i} { font-size:${size}px; }`
                ).join("\n")
            }
        </style>
        <rect width={`${width}px`} height={`${height}px`} fill={backgroundColor} />


        {
            [...Array(textCount)].map((_, i) => {
                return (
                    <text key={i} x={randomFitToInt(randomGenerator(), 0, width)} y={randomFitToInt(randomGenerator(), 0, height)}
                        className={[
                            `blink-dur-${randomFitToInt(randomGenerator(), 0, BLINK_DUR_VARIANTS.length)}`,
                            `blink-size-${randomFitToInt(randomGenerator(), 0, BLINK_SIZE_VARIANTS.length)}`,
                            `blink-init-${randomFitToInt(randomGenerator(), 0, BLINK_INIT_VARIANTS.length)}`,
                        ].join(" ")}
                    >
                        404</text>
                )
            })
        }

    </svg>)
}


export const SceneComponent: SceneModule["SceneComponent"] = FourOFour;
export const SceneIcon: SceneModule["SceneIcon"] = ErrorIcon;
export const name: SceneModule["name"] = "404";
export const meta: SceneModule["meta"] = fourOFourMeta;