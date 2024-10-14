"use client"

import * as React from 'react'

import ColorInput, { ColorInputProps } from '@/app/ui-components/basics/color-input';
import SliderBar, { SliderBarProps } from '@/app/ui-components/basics/slider-bar';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';


const ColorInputRouterUpdater = React.forwardRef<HTMLInputElement, Omit<ColorInputProps, "onChange"> & { paramName: string }>(
    function ColorInputRouterUpdater({ paramName, ...other }, ref) {
        const router = useRouter();
        const path = usePathname();
        const searchParam = useSearchParams();

        const handleOnChange = (value: string) => {
            const updatedSP = new URLSearchParams(searchParam.toString());
            updatedSP.set(paramName, value);

            router.replace(path + '?' + updatedSP.toString())
        }

        return <ColorInput {...other} ref={ref} onChange={handleOnChange} />
    }
)

const SliderBarRouterUpdater = React.forwardRef<HTMLDivElement, Omit<SliderBarProps, "onChange"> & { paramName: string }>(
    function SliderBarRouterUpdater({ paramName, ...other }, ref) {
        const router = useRouter();
        const path = usePathname();
        const searchParam = useSearchParams();

        const handleOnChange = (value: number) => {
            const updatedSP = new URLSearchParams(searchParam.toString());
            updatedSP.set(paramName, value.toString());

            router.replace(path + '?' + updatedSP.toString())
        }

        return <SliderBar {...other} ref={ref} onChange={handleOnChange} />
    }
)

export { SliderBarRouterUpdater, ColorInputRouterUpdater }