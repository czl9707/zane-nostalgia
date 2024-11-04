"use client"

import * as React from 'react'
import { useSearchParams } from 'next/navigation';
import { styled } from '@pigment-css/react';

import { defaultSizeParameterResolver } from '@/app/scene-components/utils/resolver'
import Panel from '@/app/components/ui/panel';


const SVGContainer = styled('svg')(({ theme }) => ({
    position: "fixed", left: "50%", top: "50%",
    transform: "translate(-50%, -50%)",
    transition: `all ${theme.transition.short} linear`,
    boxSizing: "content-box",
}))

export default function SceneLayout({ children }: {
    children: React.ReactNode,
}) {
    const queryParam = useSearchParams();
    const sizeParam = defaultSizeParameterResolver({
        width: queryParam.get("width") ?? undefined,
        height: queryParam.get("height") ?? undefined
    });

    return (
        <>
            <Panel style={{ position: "fixed", inset: 0 }} />
            <SVGContainer viewBox={`0 0 ${sizeParam.width} ${sizeParam.height}`} height="96%" width="96%" preserveAspectRatio="xMidYMid meet">
                {children}
            </SVGContainer>
        </>
    )
}


export const dynamicParams = false;
export const dynamic = 'force-static';