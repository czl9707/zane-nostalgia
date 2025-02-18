import { redirect } from "next/navigation";

import { fetchSceneMetas } from "@/scene-components/utils/fetch-scenes";
import SearchParamProvider from "@/scene-components/utils/search-param-provider";
import { Scene } from "@/scene-components/utils/types";
import { Metadata, ResolvingMetadata } from "next";

export async function generateStaticParams(): Promise<{ scene: string }[]> {
    const scenes = await fetchSceneMetas();
    return scenes.map(s => ({ scene: s.route }));
}

export default async function Page({ params }: { params: { scene: string } }) {
    let SceneComponent: Scene.ComponentType;
    try {
        SceneComponent = (await import(`../../../scene-components/${params.scene}.client`)).default;
    }
    catch {
        redirect("/not-found")
    }
    return <SearchParamProvider contentElement={<SceneComponent />} />;
}

export async function generateMetadata(
    { params }: { params: { scene: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const scene = (await import(`../../../scene-components/${params.scene}.meta`)).name;

    return {
        title: `Z.Nostalgia - ${scene}`,
        description: `Dynamic SVG Pattern [${scene}] provided by Z.Nostalgia. Z.Nostalgia is a web app for generating customizable, animated SVGs. Designed for easy integration into projects, available through HTTP endpoints.`,
        applicationName: "Z.Nostalgia",
        keywords: ["svg background", "svg generator", "github readme", "github readme widget"],
        icons: "/favicon.svg",
    }
}