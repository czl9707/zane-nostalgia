"use client"

import * as React from 'react'

import ColorInput, { ColorInputProps } from '../../../components/controls/color-input';
import Slider, { SliderProps } from '../../../components/controls/slider';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';


const ColorInputRouterUpdater = React.forwardRef<HTMLInputElement, Omit<ColorInputProps, "onChange"> & { paramName: string }>(
    function ColorInputRouterUpdater({ paramName, ...other }, ref) {
        const router = useRouter();
        const path = usePathname();
        const searchParam = useSearchParams();

        const handleOnChange = (value: string) => {
            const updatedSP = new URLSearchParams(searchParam.toString());
            updatedSP.set(paramName, value);

            router.replace(path + '?' + updatedSP.toString(), { scroll: false })
        }

        return <ColorInput {...other} ref={ref} onChange={handleOnChange} />
    }
)

const SliderRouterUpdater = React.forwardRef<HTMLDivElement, Omit<SliderProps, "onChange"> & { paramName: string }>(
    function SliderRouterUpdater({ paramName, ...other }, ref) {
        const router = useRouter();
        const path = usePathname();
        const searchParam = useSearchParams();

        const handleOnChange = (value: number) => {
            const updatedSP = new URLSearchParams(searchParam.toString());
            updatedSP.set(paramName, value.toString());

            router.replace(path + '?' + updatedSP.toString(), { scroll: false })
        }

        return <Slider {...other} ref={ref} onChange={handleOnChange} />
    }
)

export { SliderRouterUpdater, ColorInputRouterUpdater }