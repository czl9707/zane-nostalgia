import * as React from 'react';
import { styled } from '@pigment-css/react';

import { Scene } from '../../../scene-components/utils/types';
import { fetchSceneMetas } from '../../../scene-components/utils/fetch-scenes';

import Panel from '@/app/components/ui/panel';
import ControlPanelContent from './local-components/control-panel-content';
import ContentPanelContent from './local-components/content-panel-content';
import { redirect } from 'next/navigation';

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
    let SceneComponent: Scene.ComponentType;
    let sceneMetaModule: Scene.ComponentMetaModule;

    try {
        SceneComponent = (await import(`../../../scene-components/${scene}.client`)).default;
        sceneMetaModule = await import(`../../../scene-components/${scene}.meta`);
    }
    catch {
        redirect("/not-found")
    }

    return (
        <React.Suspense>
            <PanelWrapper>
                <ControlPanelContent meta={sceneMetaModule.meta} />
            </PanelWrapper>
            <PanelWrapper>
                <ContentPanelContent scene={scene} contentElement={<SceneComponent />} />
            </PanelWrapper>
        </React.Suspense>
    );
}
