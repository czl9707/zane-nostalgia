import * as React from 'react';
import { styled } from '@pigment-css/react';

// dont know why only relative works ......
import { defaultSceneCommonMetaData } from '../../../scene-components/utils/constants';
import { defaultParameterResolver, defaultCommonParameterResolver, resolveParameterConstraints } from '../../../scene-components/utils/resolver';
import { fetchSceneMetas } from '../../../scene-components/utils/fetch-scenes';
import { ParamMetaToken, Scene } from '../../../scene-components/utils/types';

import Panel from '@/app/components/ui/panel';
import Divider from '@/app/components/ui/divider';
import { Accordion, AccordionGroup, AccordionItem } from '@/app/components/ui/accordion';
import CopyPanel from '@/app/components/controls/copy-panel';
import ColorInput from '@/app/components/controls/color-input';
import Slider from '@/app/components/controls/slider';
import StringInput from '@/app/components/controls/string-input';
import DownloadButton from '@/app/@panels/scenes/[scene]/local-components/download-button';
import RandomSeedButton from '@/app/@panels/scenes/[scene]/local-components/random-seed-button';
import ToggleGroup, { ToggleGroupItem } from '@/app/components/controls/toggle-group';
import ControlRouterUpdator from '@/app/@panels/scenes/[scene]/local-components/controls-router-updator';
import SearchParamProvider from '@/app/scene-components/utils/search-param-provider';


export async function generateStaticParams(): Promise<{ scene: string }[]> {
    const scenes = await fetchSceneMetas();
    return scenes.map(s => ({ scene: s.route }));
}

const PanelWrapper = styled(Panel)(({ theme }) => ({
    display: "flex", flexDirection: "column",
    gap: `${theme.padding.panel}`,
}));

export default async function Panels({ params, searchParams }: { params: Promise<{ scene: string }>, searchParams: Record<string, string> }) {
    const renderToString = (await import('react-dom/server')).renderToString;

    const SceneComponent: Scene.ComponentModule = await import(`../../../scene-components/${(await params).scene}`);
    const sceneMetaModule: Scene.ComponentMetaModule = await import(`../../../scene-components/${(await params).scene}.meta`);
    const meta = sceneMetaModule.meta;

    let resolvedCommon = defaultCommonParameterResolver(searchParams);
    resolvedCommon = resolveParameterConstraints(resolvedCommon, defaultSceneCommonMetaData);
    let resolved = defaultParameterResolver(searchParams, meta);
    resolved = resolveParameterConstraints(resolved, meta);

    const svgContent = ""
    // renderToString(
    //     <SceneComponent.default {...searchParams} />
    // );

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
                <AccordionGroup type="multiple">
                    {
                        Object.entries(metaGroups).map(([groupName, controlGroup]) => (
                            <React.Fragment key={groupName}>
                                <GroupControl resolvedValue={{ ...resolved, ...resolvedCommon }} groupName={groupName}
                                    controlGroup={controlGroup} />
                                <Divider />
                            </React.Fragment>
                        ))
                    }
                </AccordionGroup>
            </PanelWrapper>
            <PanelWrapper>
                <CopyPanel label={"HTTP Endpoint:"}>
                    {`https://zane-nostalgia.kiyo-n-zane.com/scenes/${(await params).scene}/api?${new URLSearchParams({ ...resolvedCommon, ...resolved } as Record<string, string>).toString()}`}
                </CopyPanel>

                <Divider />
                <CopyPanel label={"Raw SVG:"}>
                    {svgContent}
                </CopyPanel>

                <Divider />
                <DownloadButton content={svgContent} fileName={`${(await params).scene}.svg`} />
            </PanelWrapper>
        </>
    );
}

function GroupControl({ controlGroup, groupName, resolvedValue }: {
    controlGroup: { [key in keyof Scene.MetaData]: ParamMetaToken },
    groupName: string,
    resolvedValue: Scene.ComponentProps<Scene.MetaData>
}) {
    return (
        <Accordion name={groupName} fontVariant='h5'>
            {
                Object.entries(controlGroup).map(([paramName, metaEntry]) => {
                    let control = undefined;
                    switch (metaEntry.type) {
                        case "color":
                            control = <ColorInput label={metaEntry.name} color={resolvedValue[paramName] as string} />;
                            break;
                        case "number":
                            control = <Slider showValue={groupName === "Screen Size"}
                                min={metaEntry.min} max={metaEntry.max} step={metaEntry.step}
                                label={metaEntry.name} value={resolvedValue[paramName] as number} />;
                            break;
                        case "string":
                            control = <StringInput label={metaEntry.name} value={resolvedValue[paramName] as string} />;
                            break;
                        case "randomSeed":
                            control = <RandomSeedButton label={metaEntry.name} value={resolvedValue[paramName] as string} />;
                            break;
                        case "enum":
                            control = <ToggleGroup label={metaEntry.name} value={resolvedValue[paramName] as string}>
                                <>
                                    {
                                        Object.entries(metaEntry.options).map(([value, Icon]) => (
                                            <ToggleGroupItem value={value} key={value}>
                                                <Icon />
                                            </ToggleGroupItem>
                                        ))
                                    }
                                </>
                            </ToggleGroup>;
                            break;
                        default:
                            throw new Error("Unknown control type");
                    }

                    return (
                        <AccordionItem key={paramName} asChild>
                            <ControlRouterUpdator paramName={paramName} >
                                {control}
                            </ControlRouterUpdator>
                        </AccordionItem>
                    )
                })
            }
        </Accordion>
    )
}