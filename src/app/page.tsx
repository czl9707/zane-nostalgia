import * as React from "react";

import { rainyModule } from "@/scene-components/rainy";
import { defaultSceneCommonMetaData } from "@/scene-components/utils/constants";

const DEFAULT_SVG_HEIGHT = defaultSceneCommonMetaData.height.default;
const DEFAULT_SVG_WIDTH = defaultSceneCommonMetaData.width.default;

export default function Page() {
    return (
        <svg viewBox={`0 0 ${DEFAULT_SVG_WIDTH} ${DEFAULT_SVG_HEIGHT}`} height="100%" width="100%" preserveAspectRatio="xMidYMid slice">
            <rainyModule.Component />
        </svg>
    );
}


export const dynamicParams = false;
export const dynamic = 'error';