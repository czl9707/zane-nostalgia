import '@pigment-css/react/styles.css';
import { Lato, Delius } from 'next/font/google';
import { globalCss } from '@pigment-css/react';
import React from 'react';

import ThemeCorrector from "./components/utils/theme-corrector";
import type { Metadata } from 'next'
import LayoutAboveScene from './components/layout/layout-above-scene';


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
      <body style={globalVars}>
        <ThemeCorrector />
        {children}
        <LayoutAboveScene>
          {panels}
        </LayoutAboveScene>
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