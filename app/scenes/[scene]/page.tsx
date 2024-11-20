import dynamic from "next/dynamic";
import { fetchSceneMetas } from "../../scene-components/utils/fetch-scenes";

export async function generateStaticParams(): Promise<{ scene: string }[]> {
    const scenes = await fetchSceneMetas();
    return scenes.map(s => ({ scene: s.route }));
}

export default function Page({ params, searchParams }: { params: { scene: string }, searchParams: Record<string, string> }) {
    const SComponent = dynamic(async () => import(`../../scene-components/${params.scene}`).then((mod) => mod.Component))
    return (
        <SComponent {...searchParams} />
    )
}
