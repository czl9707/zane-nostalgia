import SearchParamProvider from "@/app/scene-components/utils/search-param-provider";
import { Scene } from "@/app/scene-components/utils/types";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { scene: string } }) {
    let SceneComponentModule: Scene.ComponentModule;
    try {
        SceneComponentModule = await import(`../../scene-components/${params.scene}`);
    }
    catch {
        redirect("/not-found")
    }
    return <SearchParamProvider Component={SceneComponentModule.Component} />;
}
