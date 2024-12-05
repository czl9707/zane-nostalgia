import 'server-only'
import { NextRequest } from "next/server";
import { Scene } from '@/app/scene-components/utils/types';

export async function GET(request: NextRequest, { params }: { params: { scene: string } }) {
    const renderToString = (await import('react-dom/server')).renderToString;
    const searchParams = Object.fromEntries(new URL(request.url).searchParams);

    const SceneComponentModule: Scene.ComponentModule = await import(`../../../scene-components/${params.scene}`);

    const result = renderToString(<SceneComponentModule.Component {...searchParams} />,);
    const response = new Response(result, {
        headers: {
            "Content-type": "image/svg+xml; charset=utf-8",
            "Cache-Control": "public, max-age=7200",
        },
    });
    return response;
}