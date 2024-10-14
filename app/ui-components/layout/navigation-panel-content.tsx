import fs from 'fs';
import path from 'path';
import { useRouter } from "next/navigation";

import { Accordin, AccordinButton } from "../basics/accordin";
import { H4Typography } from "../basics/typography";
import { Orbit } from "../icons/icons";
import { SceneModule } from '@/app/scene-components/utils/types';


const playgroundContents = [
    {
        Icon: Orbit,
        name: "Galaxy",
        route: "galaxy",
    }
]


export async function NavigationPanelContent() {
    const sceneDir = path.join(process.cwd(), "app/scene-components");
    const scenes = fs.readdirSync(sceneDir);
    console.log(scenes)

    const sceneContents = [];
    for (const fileName of scenes) {
        if (!fileName.endsWith(".tsx")) {
            continue
        }

        const sceneName = fileName.split(".")[0];
        const sceneModule: SceneModule = await import(`../../scene-components/${sceneName}`);
        sceneContents.push({
            Icon: sceneModule.SceneIcon,
            name: sceneModule.name,
            route: sceneName,
        })
    }

    const router = useRouter();
    return (
        <Accordin defaultOpen buttonContent={
            <H4Typography
                style={{ cursor: "pointer", padding: '.5rem', userSelect: "none", }}>
                NOSTALGIA .Z
            </H4Typography>
        }>
            <AccordinButton text={"Home"} onClick={() => router.push("/")} />
            <Accordin buttonContent={"Scenes"}>
                {
                    sceneContents.map(({ Icon, name, route }) => (
                        <AccordinButton text={name} icon={<Icon />} key={name}
                            onClick={() => router.push(`/scenes/${route}`)} />
                    ))
                }
            </Accordin>
            <Accordin buttonContent={"Playground"}>
                {
                    playgroundContents.map(({ Icon, name, route }) => (
                        <AccordinButton text={name} icon={<Icon />} key={name}
                            onClick={() => router.push(`/playground/${route}`)} />
                    ))
                }
            </Accordin>
        </Accordin>
    )
}