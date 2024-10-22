import { Error as ErrorIcon } from "../ui-components/icons/icons";
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
        default: "#888888",

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
        default: 10,
        min: 3,
        max: 20,
        step: 1,

        controlOrder: 3,
    },
};


function FourOFour({
    color,
    backgroundColor,
    rotation,
    density,
    height,
    width,
}: SceneComponentProps<FourOFourMeta & SceneSizeMetaData>) {
    return (<svg viewBox={`0 0 ${width} ${height}`} height={`${height}px`} width={`${width}px`} role="img" xmlns="http://www.w3.org/2000/svg">


        <rect width={`${width}px`} height={`${height}px`} fill={backgroundColor} />

    </svg>)
}



export const SceneComponent: SceneModule["SceneComponent"] = FourOFour;
export const SceneIcon: SceneModule["SceneIcon"] = ErrorIcon;
export const name: SceneModule["name"] = "404";
export const meta: SceneModule["meta"] = fourOFourMeta;