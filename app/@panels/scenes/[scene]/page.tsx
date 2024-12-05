import * as React from 'react';
import { styled } from '@pigment-css/react';

import { Scene } from '../../../scene-components/utils/types';

import Panel from '@/app/components/ui/panel';
import ControlPanelContent from './local-components/control-panel-content';
import ContentPanelContent from './local-components/content-panel-content';
import { redirect } from 'next/navigation';


const PanelWrapper = styled(Panel)(({ theme }) => ({
    display: "flex", flexDirection: "column",
    gap: `${theme.padding.panel}`,
}));

export default async function Panels({ params }: { params: Promise<{ scene: string }> }) {
    const scene = (await params).scene;
    let SceneComponentModule: Scene.ComponentModule;
    let sceneMetaModule: Scene.ComponentMetaModule;

    try {
        SceneComponentModule = await import(`../../../scene-components/${scene}`);
        sceneMetaModule = await import(`../../../scene-components/${scene}.meta`);
    }
    catch {
        redirect("/not-found")
    }

    return (
        <>
            <PanelWrapper>
                <ControlPanelContent meta={sceneMetaModule.meta} />
            </PanelWrapper>
            <PanelWrapper>
                <ContentPanelContent scene={scene} Component={SceneComponentModule.Component} />
            </PanelWrapper>
        </>
    );
}
