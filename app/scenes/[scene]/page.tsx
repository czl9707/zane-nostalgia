import { redirect } from "next/navigation";

import { fetchSceneMetas } from "@/app/scene-components/utils/fetch-scenes";
import SearchParamProvider from "@/app/scene-components/utils/search-param-provider";
import { Scene } from "@/app/scene-components/utils/types";


export async function generateStaticParams(): Promise<{ scene: string }[]> {
    const scenes = await fetchSceneMetas();
    return scenes.map(s => ({ scene: s.route }));
}

export default async function Page({ params }: { params: { scene: string } }) {
    let SceneComponent: Scene.ComponentType;
    try {
        SceneComponent = (await import(`../../scene-components/${params.scene}.client`)).default;
    }
    catch {
        redirect("/not-found")
    }
    return <SearchParamProvider contentElement={<SceneComponent />} />;
}
