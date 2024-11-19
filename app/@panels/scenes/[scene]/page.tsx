import * as React from 'react';

// dont know why only relative works ......
import { defaultSceneCommonMetaData } from '../../../scene-components/utils/constants';
import { defaultParameterResolver, defaultCommonParameterResolver, resolveParameterConstraints } from '../../../scene-components/utils/resolver';
import { fetchScene, fetchSceneMetas } from '../../../scene-components/utils/fetch-scenes';
import { ParamMetaToken, Scene } from '../../../scene-components/utils/types';

import Panel from '../../../components/ui/panel';
import Divider from '../../../components/ui/divider';
import CopyPanel from '../../../components/controls/copy-panel';

import ControlRouterUpdator from './controls-router-updator';
import { styled } from '@pigment-css/react';
import ColorInput from '@/app/components/controls/color-input';
import Slider from '@/app/components/controls/slider';
import StringInput from '@/app/components/controls/string-input';
import { Accordion, AccordionGroup, AccordionItem } from '@/app/components/ui/accordion';


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

    let resolvedCommon = defaultCommonParameterResolver(searchParams);
    resolvedCommon = resolveParameterConstraints(resolvedCommon, defaultSceneCommonMetaData);
    let resolved = defaultParameterResolver(searchParams, meta);
    resolved = resolveParameterConstraints(resolved, meta);

    const metaGroups: { [key: string]: { [key: string]: ParamMetaToken } } = {};

    for (const [paramName, token] of Object.entries({ ...meta, ...defaultSceneCommonMetaData })) {
        if (!metaGroups.hasOwnProperty(token.group)) {
            metaGroups[token.group] = {};
        }
        metaGroups[token.group][paramName] = token;
    }

    return (
        <>
            <PanelWrapper>
                {
                    Object.entries(metaGroups).map(([groupName, controlGroup], i) => (
                        <div>
                            <GroupControl resolvedValue={{ ...resolved, ...resolvedCommon }} groupName={groupName}
                                controlGroup={controlGroup} key={i} />
                            <Divider />
                        </div>
                    ))
                }
            </PanelWrapper>
            <PanelWrapper>
                <CopyPanel label={"To use in Markdown:"}>
                    {`<img align="center" src="https://zane-nostalgia.kiyo-n-zane.com/scenes/${(await params).scene}/api?${new URLSearchParams({ ...resolvedCommon, ...resolved } as Record<string, string>).toString()}" />`}
                </CopyPanel>

                <Divider />
                <CopyPanel label={"Raw SVG:"}>
                    {renderToString(<sceneModule.Component {...resolvedCommon} {...resolved} />)}
                </CopyPanel>
            </PanelWrapper>
        </>
    );
}

function GroupControl({ controlGroup, groupName, resolvedValue }: {
    controlGroup: { [key in keyof Scene.MetaData]: ParamMetaToken },
    groupName: string,
    resolvedValue: Scene.ComponentProps<Scene.MetaData>
}) {
    return <AccordionGroup type="single" collapsible>
        <Accordion name={groupName} fontVariant='h5'>
            {
                Object.entries(controlGroup).map(([paramName, metaEntry], i) => {
                    let control = undefined;
                    if (metaEntry.type === "color")
                        control = (
                            <ColorInput label={metaEntry.name}
                                defaultColor={resolvedValue[paramName] as string} />
                        );
                    else if (metaEntry.type === "number")
                        control = (
                            <Slider showValue={groupName === "Screen Size"}
                                min={metaEntry.min} max={metaEntry.max} step={metaEntry.step}
                                label={metaEntry.name} defaultValue={resolvedValue[paramName] as number} />
                        );
                    else if (metaEntry.type === "string")
                        control = (
                            <StringInput
                                label={metaEntry.name} defaultValue={resolvedValue[paramName] as string} />
                        );

                    return (
                        <AccordionItem key={paramName}>
                            <ControlRouterUpdator paramName={paramName} >
                                {control}
                            </ControlRouterUpdator>
                        </AccordionItem>
                    )
                })
            }
        </Accordion>
    </AccordionGroup >
}