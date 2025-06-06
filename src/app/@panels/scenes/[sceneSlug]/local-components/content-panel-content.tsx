"use client"

import * as React from 'react';
import * as Client from 'react-dom/client';
import * as ReactDOM from 'react-dom';
import { useSearchParams } from 'next/navigation';

import CopyPanel from '@/components/controls/copy-panel';
import Divider from '@/components/ui/divider';
import DownloadButton from './download-button';


export default function ContentPanelContent({ scene, contentElement }: { scene: string, contentElement: React.ReactElement }) {
    const [svgContent, setSVGContent] = React.useState<string>("");
    const searchParams = useSearchParams();

    React.useEffect(() => {
        new Promise((resolve) => setTimeout(resolve, 0)).then(() => {
            if (typeof document === "undefined") return;

            const container = document?.createElement('div');
            const root = Client.createRoot(container);
            ReactDOM.flushSync(() => {
                root.render(React.cloneElement(contentElement, Object.fromEntries(searchParams.entries())));
            });
            setSVGContent(container.innerHTML);
            root.unmount();
        })
    }, [searchParams])

    return <>
        <CopyPanel label={"HTTP Endpoint:"}>
            {`https://zane-nostalgia.kiyo-n-zane.com/scenes/${scene}/api?${searchParams.toString()}`}
        </CopyPanel>

        <Divider />
        <CopyPanel label={"Raw SVG:"}>
            {svgContent}
        </CopyPanel>

        <Divider />
        <DownloadButton content={svgContent} fileName={`${scene}.svg`} />
    </>
}