"use client"

import * as React from 'react'

import { Slot } from '@radix-ui/react-slot';

import { useSearchParams } from 'next/navigation';

export default function ControlRouterUpdator({ paramName, children, ...other }: { paramName: string, children: React.ReactNode }) {
    const searchParams = useSearchParams();

    const handleOnChange = (value: string) => {
        const updatedSP = new URLSearchParams(searchParams.toString());
        updatedSP.set(paramName, value);

        // no router update here.
        window.history.pushState(null, '', `?${updatedSP.toString()}`);
    }

    return (
        // work around the onChange type
        <Slot onChange={handleOnChange as unknown as React.FormEventHandler<HTMLElement>} {...other}>
            {children}
        </Slot>
    )
}