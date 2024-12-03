import path from "path";
import { promises as fs } from "fs";

import { Scene } from "./types";

async function fetchScene(scene: string) {
    return (await import(`../${scene}`)) as Scene.Module;
}

async function fetchSceneMetas() {
    const sceneDir = path.join(process.cwd(), "app/scene-components");
    const scenes = await fs.readdir(sceneDir);
    const sceneContents = scenes
        .filter(f => f.endsWith(".tsx"))
        .map(f => f.split(".")[0])
        .map(async s => {
            const sceneModule: Scene.Module = await import(`../${s}`);
            return {
                Icon: sceneModule.Icon,
                name: sceneModule.name,
                route: s,
            };
        });

    return Promise.all(sceneContents);
}

export { fetchScene, fetchSceneMetas }