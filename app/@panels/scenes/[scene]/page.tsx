import * as React from 'react';

// dont know why only relative works ......
import { defaultSceneCommonMetaData } from '../../../scene-components/utils/constants';
import { defaultParameterResolver, defaultCommonParameterResolver, resolveParameterConstraints } from '../../../scene-components/utils/resolver';
import { fetchScene, fetchSceneMetas } from '../../../scene-components/utils/fetch-scenes';
import { Scene } from '../../../scene-components/utils/types';

import Panel from '../../../components/ui/panel';
import Divider from '../../../components/ui/divider';
import CopyPanel from '../../../components/controls/copy-panel';

import ControlRouterUpdator from './controls-router-updator';
import { styled } from '@pigment-css/react';
import ColorInput from '@/app/components/controls/color-input';
import Slider from '@/app/components/controls/slider';
import StringInput from '@/app/components/controls/string-input';


export async function generateStaticParams(): Promise<{ scene: string }[]> {
    const scenes = await fetchSceneMetas();
    return scenes.map(s => ({ scene: s.route }));
}

const PanelWrapper = styled(Panel)(({ theme }) => ({
    display: "flex", flexDirection: "column",
    gap: `${theme.padding.panel}`,
}));

export default async function Panels({ params, searchParams }: { params: Promise<{ scene: string }>, searchParams: { [key: string]: string } }) {
    const renderToString = (await import('react-dom/server')).renderToString;

    const sceneModule: Scene.Module = await fetchScene((await params).scene);
    const meta: Scene.MetaData = sceneModule.meta;

    let resolvedSize = defaultCommonParameterResolver(searchParams);
    resolvedSize = resolveParameterConstraints(resolvedSize, defaultSceneCommonMetaData);
    let resolved = defaultParameterResolver(searchParams, meta);
    resolved = resolveParameterConstraints(resolved, meta);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const metaEntries = Object.entries(meta).sort(([pn, metaEntry]) => metaEntry.controlOrder)

    return (
        <>
            <PanelWrapper>
                {
                    metaEntries.map(([paramName, metaEntry], i) => {
                        let control = null;
                        if (metaEntry.type === "color")
                            control = (
                                <ControlRouterUpdator paramName={paramName}>
                                    <ColorInput label={metaEntry.name}
                                        defaultColor={resolved[paramName] as string} />
                                </ControlRouterUpdator>
                            );
                        else if (metaEntry.type === "number")
                            control = (
                                <ControlRouterUpdator paramName={paramName}>
                                    <Slider
                                        min={metaEntry.min} max={metaEntry.max} step={metaEntry.step}
                                        label={metaEntry.name} defaultValue={resolved[paramName] as number} />
                                </ControlRouterUpdator>

                            );
                        else if (metaEntry.type === "string")
                            control = (
                                <ControlRouterUpdator paramName={paramName}>
                                    <StringInput
                                        label={metaEntry.name} defaultValue={resolved[paramName] as string} />
                                </ControlRouterUpdator>
                            );

                        return (
                            <React.Fragment key={paramName}>
                                {i > 0 && <Divider />}
                                {control}
                            </React.Fragment>
                        )
                    })
                }
            </PanelWrapper>
            <PanelWrapper>
                <ControlRouterUpdator paramName={"height"}>
                    <Slider showValue
                        min={defaultSceneCommonMetaData.height.min} max={defaultSceneCommonMetaData.height.max} step={defaultSceneCommonMetaData.height.step}
                        label={defaultSceneCommonMetaData.height.name} defaultValue={resolvedSize["height"]} />
                </ControlRouterUpdator>
                <Divider />
                <ControlRouterUpdator paramName={"width"}>
                    <Slider showValue
                        min={defaultSceneCommonMetaData.width.min} max={defaultSceneCommonMetaData.width.max} step={defaultSceneCommonMetaData.width.step}
                        label={defaultSceneCommonMetaData.width.name} defaultValue={resolvedSize["width"]} />
                </ControlRouterUpdator>
                <Divider />

                <CopyPanel label={"To use in Markdown:"}>
                    {`<img align="center" src="https://zane-nostalgia.kiyo-n-zane.com/scenes/${(await params).scene}/api?${new URLSearchParams({ ...resolvedSize, ...resolved } as Record<string, string>).toString()}" />`}
                </CopyPanel>

                <Divider />
                <CopyPanel label={"Raw SVG:"}>
                    {renderToString(<sceneModule.Component {...resolvedSize} {...resolved} />)}
                </CopyPanel>
            </PanelWrapper>
        </>
    );
}