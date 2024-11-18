import SceneComponent from "@/app/scene-components/utils/scene-component";

import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ scene: string }> }) {
    const renderToString = (await import('react-dom/server')).renderToString;
    const searchParams = Object.fromEntries(new URL(request.url).searchParams);

    const result = renderToString(<SceneComponent name={(await params).scene} {...searchParams} />);
    const response = new Response(result, {
        headers: {
            "Content-type": "image/svg+xml; charset=utf-8",
            "Cache-Control": "public, max-age=7200",
        },
    });
    return response;
}