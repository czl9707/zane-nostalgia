"use client"

import * as React from 'react';
// import { useRouter, usePathname } from 'next/navigation';

import Panel from "@/app/ui-components/basics/panel";
import SliderBar from "@/app/ui-components/basics/slider-bar";
import ColorInput from '@/app/ui-components/basics/color-input';
import Divider from '@/app/ui-components/basics/divider';
// import { MeteorShowerProps } from '@/app/scene-components/meteors';


export default function Panels() {
    // const router = useRouter();
    // const path = usePathname();

    const routingFactory = React.useMemo(() => {
        // const defaultParams: MeteorShowerProps = {}
        // function routingFactory<K extends keyof MeteorShowerProps>(key: K) {
        //     return (value: MeteorShowerProps[K]) => {
        //         defaultParams[key] = value;
        //         const searchParams = new URLSearchParams();
        //         for (const k in defaultParams) {
        //             searchParams.set(k, (defaultParams[k as keyof MeteorShowerProps] as string | number).toString())
        //         }

        //         router.replace(path + '?' + searchParams.toString())
        //     }
        // }

        // return routingFactory;

        return (s) => undefined;
    }, [])


    return (
        <Panel>
            <SliderBar min={5} max={20} step={1} defaultValue={10} label="Density"
                onChange={routingFactory("density")} />
            <Divider />
            <SliderBar min={0} max={180} step={5} defaultValue={45} label="Rotation"
                onChange={routingFactory("rotation")} />
            <Divider />
            <ColorInput label="Color" defaultColor="#888888"
                onChange={routingFactory("color")} />
            <Divider />
            <ColorInput label="Background Color" defaultColor="#000000"
                onChange={routingFactory("backgroundColor")} />
        </Panel>
    )
}