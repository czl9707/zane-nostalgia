import * as React from 'react';

import { Scene } from './types';
import { defaultCommonParameterResolver, defaultParameterResolver, resolveParameterConstraints } from './resolver';
import { defaultSceneCommonMetaData } from './constants';


interface SceneComponentProps<M extends Scene.MetaData> {
    Component: React.FC<Scene.ComponentProps<M & Scene.CommonMetaData>>,
    meta: M,
}

export default function SceneComponent<M extends Scene.MetaData>({ Component, meta, ...props }: SceneComponentProps<M>) {
    const resolvedParam = defaultParameterResolver(props, meta);
    const resolvedSizeParam = defaultCommonParameterResolver(props);
    const resolved = resolveParameterConstraints({ ...resolvedParam, ...resolvedSizeParam }, { ...meta, ...defaultSceneCommonMetaData });

    const styleText = `
    @font-face{
        font-family: 'Space Grotesk';
        src: url(https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mPbF4Cw.woff2) format("woff2");
    }
    text {font-family: 'Space Grotesk';}`;

    return (
        <svg viewBox={`0 0 ${resolved.width} ${resolved.height}`}
            height={`${resolved.height}px`} width={`${resolved.width}px`}
            role="img" xmlns="http://www.w3.org/2000/svg"
        >
            <style dangerouslySetInnerHTML={{ __html: styleText }} />
            <Component {...resolved} />
            {resolved.bannerText &&
                <text x="50%" y="50%"
                    dominantBaseline="middle" textAnchor="middle"
                    style={{ fill: resolved.bannerColor, fontSize: "4rem" }}
                >
                    {resolved.bannerText}
                </text>
            }
        </svg>
    )
}