import '@pigment-css/react/styles.css';
import { Lato, Delius } from 'next/font/google';
import { globalCss } from '@pigment-css/react';

import InformationThread from "@/app/ui-components/layout/information-thread";
import ThemeCorrector from "./ui-components/utils/theme-corrector";
import React from 'react';
import { fetchSceneMetas } from './scene-components/utils/fetch-scenes';

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  style: ['italic', 'normal'],
  subsets: ['latin-ext']
});

const delius = Delius({
  weight: ["400",],
  style: ['normal'],
  subsets: ['latin']
});

const globalVars = {
  "--serious-font-family": lato.style.fontFamily,
  "--playful-font-family": delius.style.fontFamily,
} as React.CSSProperties;


globalCss(({ theme }) => ({
  // scroll bar
  "&::-webkit-scrollbar": {
    width: "6px", padding: "0 3px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.vars.colors.secondary.background.opaque,
    borderRadius: "5px",
  },
  "&::-webkit-scrollbar-button": {
    backgroundColor: "transparent", height: "5px",
  },

  "body": {
    margin: 0, padding: 0, width: "100vw", height: "100vh", overflow: "hidden",
    backgroundColor: theme.vars.colors.primary.background.solid,
  }
}));

export default async function RootLayout({
  children, panels
}: {
  children: React.ReactNode,
  panels: React.ReactNode,
}) {
  const sceneNavigationInfo = await fetchSceneMetas();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Zane&apos;s Nostalgia Moments</title>
        <meta name="description" content="Zane is an architect turn developer, Zane's Nostalgia is a collection of svg background created when he is Nostalgia." />
        <link rel="icon" href="/favicon.svg" type="/src/image/svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={globalVars}>
        <ThemeCorrector />
        {children}
        <InformationThread sceneNavInfo={sceneNavigationInfo}>
          {panels}
        </InformationThread>
      </body>
    </html>
  )
}
