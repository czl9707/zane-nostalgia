"use client"

import * as React from 'react';
import { CssBaseline } from "@mui/material"
import ThemeProviderWrapper from "./components/theme"
import Header from "./components/header"

import scenes from './scenes';


function Page() {
  return (
    <>
      <CssBaseline />
      <ThemeProviderWrapper>
        <Header />
        <iframe src={`/api/${RandomScenePath()}`} style={{
          position: "fixed", width: "100vw", height: "100vh", border: "none"
        }} />
      </ThemeProviderWrapper>
    </>
  );
}


function RandomScenePath(): string {
  return scenes[
    Math.floor(Math.random() * scenes.length)
  ].name;
}

export default Page;
