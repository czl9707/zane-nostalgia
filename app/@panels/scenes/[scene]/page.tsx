import * as React from 'react';
import { styled } from '@pigment-css/react';

import { fetchSceneMetas } from '../../../scene-components/utils/fetch-scenes';
import { Scene } from '../../../scene-components/utils/types';

import Panel from '@/app/components/ui/panel';
import ControlPanelContent from './local-components/control-panel-content';
import ContentPanelContent from './local-components/content-panel-content';


export async function generateStaticParams(): Promise<{ scene: string }[]> {
    const scenes = await fetchSceneMetas();
    return scenes.map(s => ({ scene: s.route }));
}

const PanelWrapper = styled(Panel)(({ theme }) => ({
    display: "flex", flexDirection: "column",
    gap: `${theme.padding.panel}`,
}));

export default async function Panels({ params }: { params: Promise<{ scene: string }> }) {
    const scene = (await params).scene;
    const SceneComponentModule: Scene.ComponentModule = await import(`../../../scene-components/${scene}`);
    const sceneMetaModule: Scene.ComponentMetaModule = await import(`../../../scene-components/${scene}.meta`);

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
