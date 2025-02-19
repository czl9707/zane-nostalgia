import { redirect } from "next/navigation";

import { fetchSceneMetas } from "@/scene-components/utils/fetch-scenes";
import SearchParamProvider from "@/scene-components/utils/search-param-provider";
import { Scene } from "@/scene-components/utils/types";
import { Metadata, ResolvingMetadata } from "next";

export async function generateStaticParams(): Promise<{ sceneSlug: string }[]> {
    const scenes = await fetchSceneMetas();
    return scenes.map(s => ({ sceneSlug: s.route }));
}

export default async function Page({ params }: { params: Promise<{ sceneSlug: string }> }) {
    let SceneComponent: Scene.ComponentType;
    try {
        SceneComponent = (await import(`../../../scene-components/${(await params).sceneSlug}.client`)).default;
    }
    catch {
        redirect("/not-found")
    }
    return <SearchParamProvider contentElement={<SceneComponent />} />;
}

export async function generateMetadata(
    { params }: { params: Promise<{ sceneSlug: string }> },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    parent: ResolvingMetadata
): Promise<Metadata> {
    const scene = (await import(`../../../scene-components/${(await params).sceneSlug}.meta`)).name;

    return {
        title: `Z.Nostalgia - ${scene}`,
        description: `Dynamic SVG Pattern [${scene}] provided by Z.Nostalgia. Z.Nostalgia is a web app for generating customizable, animated SVGs. Designed for easy integration into projects, available through HTTP endpoints.`,
        applicationName: "Z.Nostalgia",
        keywords: ["svg background", "svg generator", "github readme", "github readme widget"],
        icons: "/favicon.svg",
    }
}