"use client"

import * as React from 'react';
import { useSearchParams } from "next/navigation";
import { sceneModules } from '..';

export default function SearchParamProvider({ scene }: { scene: string }) {
    const sceneModule = sceneModules.filter(s => s.route == scene)[0];

    const searchParams = useSearchParams();
    return <sceneModule.Component {... Object.fromEntries(searchParams.entries())}/>
}