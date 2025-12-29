import * as React from 'react';
import { styled } from '@pigment-css/react';
import { redirect } from 'next/navigation';

import { sceneModules } from '@/scene-components';
import Panel from '@/components/ui/panel';

import ControlPanelContent from './local-components/control-panel-content';
import ContentPanelContent from './local-components/content-panel-content';

export async function generateStaticParams(): Promise<{ sceneSlug: string }[]> {
    return sceneModules.map(s => ({ sceneSlug: s.route }));
}


const PanelWrapper = styled(Panel)(({ theme }) => ({
    display: "flex", flexDirection: "column",
    gap: `${theme.padding.panel}`,
}));

export default async function Panels({ params }: { params: Promise<{ sceneSlug: string }> }) {
    const scene = (await params).sceneSlug;
    const sceneModule = sceneModules.filter(s => s.route == scene).at(0);

    if (!sceneModule)
    {
        redirect("/not-found")
    }

    return (
        <React.Suspense>
            <PanelWrapper>
                <ControlPanelContent meta={sceneModule.meta} />
            </PanelWrapper>
            <PanelWrapper>
                <ContentPanelContent scene={scene} contentElement={<sceneModule.Component />} />
            </PanelWrapper>
        </React.Suspense>
    );
}
