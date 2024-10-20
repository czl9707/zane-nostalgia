import * as React from 'react';

import { SceneMetaData, SceneModule } from '@/app/scene-components/utils/types';
import { defaultParameterResolver, defaultSizeParameterResolver, resolveParameterConstraints } from '@/app/scene-components/utils/resolver';
import { fetchScene, fetchSceneMetas } from '@/app/scene-components/utils/fetch-scenes';
import { defaultSceneSizeMetaData } from '@/app/scene-components/utils/constants';

import Divider from '@/app/ui-components/basics/divider';
import Panel from '@/app/ui-components/basics/panel';
import { QuoteTypography } from '@/app/ui-components/basics/typography';
import CopyPanel from '@/app/ui-components/basics/copy-panel';

import { ColorInputRouterUpdater, SliderBarRouterUpdater } from './controls-router-updator';


export async function generateStaticParams(): Promise<{ scene: string }[]> {
    const scenes = await fetchSceneMetas();
    return scenes.map(s => ({ scene: s.route }));
}

export default async function Panels({ params, searchParams }: { params: { scene: string }, searchParams: { [key: string]: string } }) {
    const renderToString = (await import('react-dom/server')).renderToString;

    const sceneModule: SceneModule = await fetchScene(params.scene);
    const meta: SceneMetaData = sceneModule.meta;

    let resolvedSize = defaultSizeParameterResolver(searchParams);
    resolvedSize = resolveParameterConstraints(resolvedSize, defaultSceneSizeMetaData);
    let resolved = defaultParameterResolver(searchParams, meta);
    resolved = resolveParameterConstraints(resolved, meta);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const metaEntries = Object.entries(meta).sort(([pn, metaEntry]) => metaEntry.controlOrder)

    return (
        <>
            <Panel>
                {
                    metaEntries.map(([paramName, metaEntry], i) => {
                        if (metaEntry.type === "color")
                            return (
                                <React.Fragment key={paramName}>
                                    {i > 0 && <Divider />}
                                    <ColorInputRouterUpdater paramName={paramName}
                                        label={metaEntry.name} defaultColor={resolved[paramName] as string} />
                                </React.Fragment>
                            )
                        else if (metaEntry.type === "number")
                            return (
                                <React.Fragment key={paramName}>
                                    {i > 0 && <Divider />}
                                    <SliderBarRouterUpdater paramName={paramName}
                                        min={metaEntry.min} max={metaEntry.max} step={metaEntry.step}
                                        label={metaEntry.name} defaultValue={resolved[paramName] as number} />
                                </React.Fragment>
                            )
                    })
                }
            </Panel>
            <Panel>
                <QuoteTypography color="secondary" style={{ marginBottom: ".7rem" }}>
                    * Window size Parameters won&apos;t applies to preview.
                </QuoteTypography>

                <SliderBarRouterUpdater paramName={"height"}
                    min={defaultSceneSizeMetaData.height.min} max={defaultSceneSizeMetaData.height.max} step={defaultSceneSizeMetaData.height.step}
                    label={defaultSceneSizeMetaData.height.name} defaultValue={resolvedSize["height"]} />
                <Divider />
                <SliderBarRouterUpdater paramName={"width"}
                    min={defaultSceneSizeMetaData.width.min} max={defaultSceneSizeMetaData.width.max} step={defaultSceneSizeMetaData.width.step}
                    label={defaultSceneSizeMetaData.width.name} defaultValue={resolvedSize["width"]} />
                <Divider />

                <CopyPanel label={"To use in Markdown:"}>
                    {`<img align="center" src="https://zane-nostalgia.kiyo-n-zane.com/scenes/${params.scene}/api?${new URLSearchParams({ ...resolvedSize, ...resolved } as Record<string, string>).toString()}" />`}
                </CopyPanel>

                <Divider />
                <CopyPanel label={"Raw SVG:"}>
                    {renderToString(<sceneModule.SceneComponent {...resolvedSize} {...resolved} />)}
                </CopyPanel>
            </Panel>
        </>
    );
}