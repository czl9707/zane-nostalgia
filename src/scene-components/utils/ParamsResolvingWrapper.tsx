import * as React from 'react';

import { Scene } from './types';
import { defaultParameterResolver, resolveParameterConstraints } from './resolver';


export function ParamsResolvingWrapper<M extends Scene.MetaData>(
    Component: React.FC<Scene.RawComponentProps<M>>,
    meta: M,
) {
    return React.forwardRef<SVGSVGElement, Scene.ComponentProps<M>>(
        function WrappedComponent(props, ref) {
            const resolvedParam = defaultParameterResolver(props as Partial<Record<string, string>>, meta);
            const resolved = resolveParameterConstraints({ ...resolvedParam }, { ...meta });

            const styleText = `text {
            font-family: 'Space Grotesk',-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
            user-select: none;
            }`;

            return (
                <svg ref={ref}
                    viewBox={`0 0 ${resolved.width} ${resolved.height}`}
                    height={`${resolved.height}px`} width={`${resolved.width}px`}
                    role="img" xmlns="http://www.w3.org/2000/svg"
                >
                    <style dangerouslySetInnerHTML={{ __html: styleText }} />
                    <Component {...resolved} />
                    {resolved.bannerText &&
                        <text x="50%" y="50%"
                            dominantBaseline="middle" textAnchor="middle"
                            style={{ fill: resolved.bannerColor as string, fontSize: "4rem", }}
                        >
                            {resolved.bannerText}
                        </text>
                    }
                </svg>
            )
        }
    );
}
