"use client"

import * as React from 'react'

import { Slot } from '@radix-ui/react-slot';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function ControlRouterUpdator({ paramName, children }: { paramName: string, children: React.ReactNode }) {
    const router = useRouter();
    const path = usePathname();
    const searchParam = useSearchParams();

    const handleOnChange = (value: string) => {
        const updatedSP = new URLSearchParams(searchParam.toString());
        updatedSP.set(paramName, value);

        router.replace(path + '?' + updatedSP.toString(), { scroll: false })
    }

    return (
        // work around the onChange type
        <Slot onChange={handleOnChange as unknown as React.FormEventHandler<HTMLElement>}>
            {children}
        </Slot>
    )
}