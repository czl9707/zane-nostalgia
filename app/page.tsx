"use client"

import * as React from 'react';
import { CssBaseline } from "@mui/material"

import ThemeProviderWrapper from "./components/theme"
import Header from "./components/header"
import scenes from './scenes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const backgroundContext = React.createContext<(background: string) => void>((_) => { })


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


function randomScenePath(): string {
  return scenes[
    Math.floor(Math.random() * scenes.length)
  ].name;
}

export default Page;
export { randomScenePath, backgroundContext }