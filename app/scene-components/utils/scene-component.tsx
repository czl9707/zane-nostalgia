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
text {font-family: 'Space Grotesk';}
`;

    return (
        <svg viewBox={`0 0 ${resolved.width} ${resolved.height}`}
            height={`${resolved.height}px`} width={`${resolved.width}px`}
            role="img" xmlns="http://www.w3.org/2000/svg"
        >
            <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
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