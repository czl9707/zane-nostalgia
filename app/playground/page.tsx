"use client"

import * as React from 'react';
import { CssBaseline } from "@mui/material"

import ThemeProviderWrapper from "../utils/theme"
import Header from "../ui-components/header"
import { backgroundContext, randomScenePath } from './sceneUtil';


function Page() {
    const [background, setBackground] = React.useState<string>(randomScenePath());

    return (
        <>
            <CssBaseline />
            <ThemeProviderWrapper>
                <backgroundContext.Provider value={setBackground}>
                    <Header />
                    <iframe src={`/api/${background}`} style={{
                        position: "fixed", width: "100vw", height: "100vh", border: "none"
                    }} />
                </backgroundContext.Provider>
            </ThemeProviderWrapper>
        </>
    );
}


export default Page;
