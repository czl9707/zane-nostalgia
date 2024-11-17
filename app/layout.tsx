import '@pigment-css/react/styles.css';
import { Space_Grotesk, Delius } from 'next/font/google';
import { CSSObjectNoCallback, globalCss } from '@pigment-css/react';
import React from 'react';

import ThemeCorrector from "./components/utils/theme-corrector";
import type { Metadata } from 'next'
import LayoutOtherThanScene from './components/layout/layout-other-than-scene';
import HeaderBarWithContextProvider from './components/layout/header-bar-with-context-provider';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const space_grotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin-ext'],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const delius = Delius({
  weight: ["400",],
  style: ['normal'],
  subsets: ['latin'],
});

globalCss(({ theme }) => ({
  // scroll bar
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.vars.colors.primary.background,
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: `color-mix(in srgb, ${theme.vars.colors.secondary.background}, transparent)`,
    borderRadius: "5px",
  },
  "&::-webkit-scrollbar-button": {
    backgroundColor: "transparent", height: "5px",
  },
  "a": { color: "inherit" },
  "body": {
    margin: 0, padding: 0, width: "100vw", height: "100vh", overflow: "hidden",
    backgroundColor: theme.vars.colors.primary.background,
  },
} as CSSObjectNoCallback));




export default function RootLayout({
  children, panels
}: {
  children: React.ReactNode,
  panels: React.ReactNode,
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content="zane-nostalgia.kiyo-n-zane.com" />
        <meta property="og:title" content="Zane's Nostalgia" />
        <meta property="og:description" content="Nostalgia, a curated collection of SVG patterns and backgrounds accessible via HTTP endpoints. Easily embed aesthetic visuals into GitHub READMEs, websites, and other projects. Perfect for developers looking to add unique, nostalgic effects with seamless integration." />
      </head>
      <body>
        <style>
          {/* a very nasty workaround here, single quote cannot hydrate successfully.
             Have to remove from fontFamily to get this working */}
          {
            `
            :root {
                --fonts-serious:${space_grotesk.style.fontFamily.split("'").join("")};
                --fonts-playful:${delius.style.fontFamily.split("'").join("")};
            }
            `
          }
        </style>
        <ThemeCorrector />
        <HeaderBarWithContextProvider>
          {children}
          <LayoutOtherThanScene>
            {panels}
          </LayoutOtherThanScene>
        </HeaderBarWithContextProvider>
      </body>
    </html>
  )
}


export const metadata: Metadata = {
  title: "Zane's Nostalgia Moments",
  description: "Nostalgia, a curated collection of SVG patterns and backgrounds accessible via HTTP endpoints. Easily embed aesthetic visuals into GitHub READMEs, websites, and other projects. Perfect for developers looking to add unique, nostalgic effects with seamless integration.",
  applicationName: "Zane's Nostalgia",
  keywords: ["svg background", "markdown", "github readme"],
  icons: "/favicon.svg",
}