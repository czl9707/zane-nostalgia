import { redirect } from "next/navigation";

import { sceneModules } from "@/scene-components";
import SearchParamProvider from "@/scene-components/utils/SearchParamProviderWrapper";
import { Metadata, ResolvingMetadata } from "next";

export async function generateStaticParams(): Promise<{ sceneSlug: string }[]> {
    return sceneModules.map(s => ({ sceneSlug: s.route }));
}

export default async function Page({ params }: { params: Promise<{ sceneSlug: string }> }) {
    const scene = (await params).sceneSlug;
    const sceneModule = sceneModules.filter(s => s.route == scene).at(0);

    if (!sceneModule)
    {
        redirect("/not-found")
    }

    return <SearchParamProvider scene={scene} />;
}

export async function generateMetadata(
    { params }: { params: Promise<{ sceneSlug: string }> },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    parent: ResolvingMetadata
): Promise<Metadata> {
    const scene = (await params).sceneSlug;
    const sceneModule = sceneModules.filter(s => s.route == scene)[0];
    return {
        title: `Z.Nostalgia - ${sceneModule.name}`,
        description: `Dynamic SVG Pattern [${sceneModule.name}] provided by Z.Nostalgia. Z.Nostalgia is a web app for generating customizable, animated SVGs. Designed for easy integration into projects, available through HTTP endpoints.`,
        applicationName: "Z.Nostalgia",
        keywords: ["svg background", "svg generator", "github readme", "github readme widget"],
        icons: "/favicon.svg",
    }
}