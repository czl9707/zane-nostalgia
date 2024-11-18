import SceneComponent from "@/app/scene-components/utils/scene-component";
import { fetchSceneMetas } from "../../scene-components/utils/fetch-scenes";

export async function generateStaticParams(): Promise<{ scene: string }[]> {
    const scenes = await fetchSceneMetas();
    return scenes.map(s => ({ scene: s.route }));
}

export default async function Page({ params, searchParams }: { params: Promise<{ scene: string }>, searchParams: { [key: string]: string } }) {
    return (
        <SceneComponent name={(await params).scene} {...searchParams} />
    )
}

