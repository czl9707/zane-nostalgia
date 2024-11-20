import '@pigment-css/react/styles.css';
import { Space_Grotesk, Delius } from 'next/font/google';
import { CSSObjectNoCallback, globalCss } from '@pigment-css/react';
import React from 'react';

import ThemeCorrector from "./components/utils/theme-corrector";
import type { Metadata } from 'next'
import LayoutOtherThanScene from './components/layout/layout-other-than-scene';
import HeaderBarWithContextProvider from './components/layout/header-bar-with-context-provider';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const space_grotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin-ext'],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const delius = Delius({
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
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: `color-mix(in srgb, ${theme.vars.colors.secondary.background}, transparent)`,
    borderRadius: "5px",
  },
  "&::-webkit-scrollbar-button": {
    backgroundColor: "transparent", height: "0",
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
  const style = `
  :root {
      --fonts-serious:${space_grotesk.style.fontFamily};
      --fonts-playful:${delius.style.fontFamily};
  }
  text {
    font-family: ${space_grotesk.style.fontFamily}
  }
  `

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
        {/* to avoid escaping single quote :) */}
        <style dangerouslySetInnerHTML={{ __html: style }} />
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