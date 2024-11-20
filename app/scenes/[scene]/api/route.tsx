import { Scene } from "../../../scene-components/utils/types";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { scene: string } }) {
    const renderToString = (await import('react-dom/server')).renderToString;
    const searchParams = Object.fromEntries(new URL(request.url).searchParams);

    const module: Scene.Module = await import(`../../../scene-components/${params.scene}`);

    const result = renderToString(<module.Component {...searchParams} />);
    const response = new Response(result, {
        headers: {
            "Content-type": "image/svg+xml; charset=utf-8",
            "Cache-Control": "public, max-age=7200",
        },
    });
    return response;
}