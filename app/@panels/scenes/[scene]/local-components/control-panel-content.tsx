"use client"

import * as React from 'react';

// dont know why only relative works ......
import { defaultSceneCommonMetaData } from '../../../../scene-components/utils/constants';
import { defaultParameterResolver, defaultCommonParameterResolver, resolveParameterConstraints } from '../../../../scene-components/utils/resolver';
import { ParamMetaToken, Scene } from '../../../../scene-components/utils/types';

import Divider from '@/app/components/ui/divider';
import { Accordion, AccordionGroup, AccordionItem } from '@/app/components/ui/accordion';
import ColorInput from '@/app/components/controls/color-input';
import Slider from '@/app/components/controls/slider';
import StringInput from '@/app/components/controls/string-input';
import RandomSeedButton from '@/app/@panels/scenes/[scene]/local-components/random-seed-button';
import ToggleGroup, { ToggleGroupItem } from '@/app/components/controls/toggle-group';
import ControlRouterUpdator from '@/app/@panels/scenes/[scene]/local-components/controls-router-updator';
import { useSearchParams } from 'next/navigation';

export default function ControlPanelContent({ meta }: { meta: Scene.MetaData }) {
    const searchParams = Object.fromEntries(useSearchParams().entries());
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
        // Always have the first group open
        <AccordionGroup type="multiple" defaultValue={[Object.entries(metaGroups)[0][0]]}>
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
    )
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
                                        Object.entries(metaEntry.options).map(([value, icon]) => (
                                            <ToggleGroupItem value={value} key={value}>
                                                {icon}
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