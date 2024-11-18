import * as React from "react";

import { Component as Rainy, meta } from "./scene-components/rainy";
import { defaultParameterResolver, defaultCommonParameterResolver } from "./scene-components/utils/resolver";
import { defaultSceneCommonMetaData } from "./scene-components/utils/constants";

const DEFAULT_SVG_HEIGHT = defaultSceneCommonMetaData.height.default;
const DEFAULT_SVG_WIDTH = defaultSceneCommonMetaData.width.default;

export default function Page() {
    const params = defaultParameterResolver({}, meta);
    const sizeParams = defaultCommonParameterResolver({});

    return (
        <svg viewBox={`0 0 ${DEFAULT_SVG_WIDTH} ${DEFAULT_SVG_HEIGHT}`} height="100%" width="100%" preserveAspectRatio="xMidYMid slice">
            <Rainy {...params} {...sizeParams} />
        </svg>
    );
}


export const dynamicParams = false;
export const dynamic = 'error';