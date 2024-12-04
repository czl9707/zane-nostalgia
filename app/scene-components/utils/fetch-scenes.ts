import path from "path";
import { promises as fs } from "fs";

import { Scene } from "./types";

async function fetchSceneMetas() {
    const sceneDir = path.join(process.cwd(), "app/scene-components");
    const scenes = await fs.readdir(sceneDir);
    const sceneContents = scenes
        .filter(f => f.endsWith("meta.tsx"))
        .map(f => f.split(".")[0])
        .map(async s => {
            const sceneModule: Scene.CommonMetaData = await import(`../${s}.meta`);
            return {
                Icon: sceneModule.Icon,
                name: sceneModule.name,
                route: s,
            };
        });

    return Promise.all(sceneContents);
}

export { fetchSceneMetas }