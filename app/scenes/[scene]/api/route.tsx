import { defaultSceneSizeMetaData } from "../../../scene-components/utils/constants";
import { fetchScene } from "../../../scene-components/utils/fetch-scenes";
import { defaultParameterResolver, defaultSizeParameterResolver, resolveParameterConstraints } from "../../../scene-components/utils/resolver";
import { SceneModule } from "../../../scene-components/utils/types";

import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ scene: string }> }) {
    const sceneModule: SceneModule = await fetchScene((await params).scene);
    const renderToString = (await import('react-dom/server')).renderToString;

    const searchParams = Object.fromEntries(new URL(request.url).searchParams);
    const resolvedParam = defaultParameterResolver(searchParams, sceneModule.meta);
    const resolvedSizeParam = defaultSizeParameterResolver(searchParams);
    const resolved = resolveParameterConstraints({ ...resolvedParam, ...resolvedSizeParam }, { ...sceneModule.meta, ...defaultSceneSizeMetaData });

    const result = renderToString(<sceneModule.SceneComponent {...resolved} />);
    const response = new Response(result, {
        headers: {
            "Content-type": "image/svg+xml; charset=utf-8",
            "Cache-Control": "public, max-age=7200",
        },
    });
    return response;
}