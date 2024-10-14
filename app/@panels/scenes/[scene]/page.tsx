import * as React from 'react';

import { SceneComponentPropsWithSize, SceneMetaData, SceneModule } from '@/app/scene-components/utils/types';
import { defaultParameterResolver, resolveParameterConstraints } from '@/app/scene-components/utils/resolver';
import { fetchScene } from '@/app/scene-components/utils/fetch-scenes';
import Divider from '@/app/ui-components/basics/divider';
import Panel from '@/app/ui-components/basics/panel';
import { ColorInputRouterUpdater, SliderBarRouterUpdater } from './controls-router-updator';


export default async function Panels({ params, searchParams }: { params: { scene: string }, searchParams: Partial<SceneComponentPropsWithSize<SceneMetaData>> }) {
    const sceneModule: SceneModule = await fetchScene(params.scene);
    const meta: SceneMetaData = sceneModule.meta;

    searchParams = defaultParameterResolver(searchParams, meta);
    searchParams = resolveParameterConstraints(searchParams as SceneComponentPropsWithSize<typeof meta>, meta);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const metaEntries = Object.entries(meta).sort(([pn, metaEntry]) => metaEntry.controlOrder)

    return (<Panel>
        {
            metaEntries.map(([paramName, metaEntry], i) => {
                if (metaEntry.type === "color")
                    return (
                        <React.Fragment key={paramName}>
                            {i > 0 && <Divider />}
                            <ColorInputRouterUpdater paramName={paramName}
                                label={metaEntry.name} defaultColor={searchParams[paramName] as string} />
                        </React.Fragment>
                    )
                else if (metaEntry.type === "number")
                    return (
                        <React.Fragment key={paramName}>
                            {i > 0 && <Divider />}
                            <SliderBarRouterUpdater paramName={paramName}
                                min={metaEntry.min} max={metaEntry.max} step={metaEntry.step}
                                label={metaEntry.name} defaultValue={searchParams[paramName] as number} />
                        </React.Fragment>
                    )
            })
        }
    </Panel>)
}