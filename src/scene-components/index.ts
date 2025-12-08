import { fourOFourModule } from "./404"
import { beatsModule } from "./beats"
import { cubesModule } from "./cubes"
import { meteorModule } from "./meteors"
import { noiseModule } from "./noise"
import { rainyModule } from "./rainy"
import { wavesModule } from "./waves"
import type { Scene } from "./utils/types";


const sceneModules: Scene.AnyComponentModule[] = [
    fourOFourModule,
    beatsModule,
    cubesModule,
    meteorModule,
    noiseModule,
    rainyModule,
    wavesModule,
];

export { sceneModules }
