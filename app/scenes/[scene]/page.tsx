import dynamic from "next/dynamic";
import { fetchSceneMetas } from "../../scene-components/utils/fetch-scenes";

export async function generateStaticParams(): Promise<{ scene: string }[]> {
    const scenes = await fetchSceneMetas();
    return scenes.map(s => ({ scene: s.route }));
}

export default function Page({ params }: { params: { scene: string } }) {
    const SComponent = dynamic(async () => import(`../../scene-components/${params.scene}`)
        .then(m => m.SearchParamConsumerComponent), { ssr: false })
    return <SComponent />;
}
