import SearchParamProvider from "@/app/scene-components/utils/search-param-provider";
import { Scene } from "@/app/scene-components/utils/types";
import { redirect } from "next/navigation";


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
