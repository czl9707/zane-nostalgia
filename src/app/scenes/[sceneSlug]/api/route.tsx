"use server"

import 'server-only'
import { NextRequest } from "next/server";
import { sceneModules } from '@/scene-components';
import { ParamsResolvingWrapper } from '@/scene-components/utils/ParamsResolvingWrapper';

export async function GET(request: NextRequest, { params }: { params: Promise<{ sceneSlug: string }> }) {
    const renderToString = (await import('react-dom/server')).renderToString;
    const searchParams = Object.fromEntries(new URL(request.url).searchParams);
    const scene = (await params).sceneSlug;
    const sceneModule = sceneModules.filter(s => s.route == scene).at(0);

    if (!sceneModule)
    {
        return new Response(undefined, { status: 404 });
    }
    const SceneComponent = ParamsResolvingWrapper(
        sceneModule.Component as React.FC,
        sceneModule.meta
    );

    const result = renderToString(<SceneComponent {...searchParams} />);
    const response = new Response(result, {
        headers: {
            "Content-type": "image/svg+xml; charset=utf-8",
            "Cache-Control": "public, max-age=7200",
        },
    });
    return response;
}