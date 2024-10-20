import { fetchScene } from "@/app/scene-components/utils/fetch-scenes";
import { defaultParameterResolver, resolveParameterConstraints } from "@/app/scene-components/utils/resolver";
import { SceneComponentPropsWithSize, SceneModule } from "@/app/scene-components/utils/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: { scene: string } }) {
    const sceneModule: SceneModule = await fetchScene(context.params.scene);
    const renderToString = (await import('react-dom/server')).renderToString;

    const searchParams = Object.fromEntries(new URL(request.url).searchParams);
    let params = defaultParameterResolver(searchParams, sceneModule.meta);
    params = resolveParameterConstraints(searchParams as SceneComponentPropsWithSize<typeof sceneModule.meta>, sceneModule.meta);

    const result = renderToString(<sceneModule.SceneComponent {...params} />);
    const response = NextResponse.json(result);
    response.headers.set("content-type", "image/svg+xml; charset=utf-8");
    return response;
}