"use client"

import { css } from '@pigment-css/react';
import * as React from 'react'

const DarkModeClass = css({
    colorScheme: "dark"
})

export default function ThemeCorrector() {
    React.useEffect(() => {
        if (!document.documentElement.classList.contains("theme-dark")) {
            document.documentElement.classList.add("theme-dark");
            document.body.classList.add(DarkModeClass);
        }
    }, [])

    return (
        <></>
    )
}

export { DarkModeClass }