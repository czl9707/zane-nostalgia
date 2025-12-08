"use client"

import * as React from 'react';
import { useSearchParams } from 'next/navigation';

import { defaultParameterResolver, resolveParameterConstraints } from '@/scene-components/utils/resolver';
import { ParamMetaToken, Scene } from '@/scene-components/utils/types';

import RandomSeedButton from './random-seed-button';
import ControlRouterUpdator from './controls-router-updator';

import Divider from '@/components/ui/divider';
import { Accordion, AccordionGroup, AccordionItem } from '@/components/ui/accordion';
import ColorInput from '@/components/controls/color-input';
import Slider from '@/components/controls/slider';
import StringInput from '@/components/controls/string-input';
import ToggleGroup, { ToggleGroupItem } from '@/components/controls/toggle-group';
import * as T from '@/components/ui/typography';


export default function ControlPanelContent({ meta }: { meta: Scene.MetaData }) {
    const searchParams = Object.fromEntries(useSearchParams().entries());
    let resolved = defaultParameterResolver(searchParams, meta);
    resolved = resolveParameterConstraints(resolved, meta);

    const metaGroups: { [key: string]: { [key: string]: ParamMetaToken } } = {};
    for (const [paramName, token] of Object.entries({ ...meta })) {
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
                        <GroupControl resolvedValue={{ ...resolved }} groupName={groupName}
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
        <Accordion name={<T.H5>{groupName}</T.H5>} value={groupName}>
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