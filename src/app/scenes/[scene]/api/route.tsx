import 'server-only'
import { NextRequest } from "next/server";
import { Scene } from '@/scene-components/utils/types';

export async function GET(request: NextRequest, { params }: { params: { scene: string } }) {
    const renderToString = (await import('react-dom/server')).renderToString;
    const searchParams = Object.fromEntries(new URL(request.url).searchParams);

    let SceneComponent: Scene.ComponentType;
    try {
        SceneComponent = (await import(`../../../../scene-components/${params.scene}.server`)).default;
    } catch {
        return new Response(undefined, { status: 404 });
    }

    const result = renderToString(<SceneComponent {...searchParams} />,);
    const response = new Response(result, {
        headers: {
            "Content-type": "image/svg+xml; charset=utf-8",
            "Cache-Control": "public, max-age=7200",
        },
    });
    return response;
}