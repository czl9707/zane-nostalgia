import '@pigment-css/react/styles.css';
import { Space_Grotesk, Delius } from 'next/font/google';
import { CSSObjectNoCallback, globalCss } from '@pigment-css/react';
import React from 'react';

import ThemeCorrector from "@/lib/theme-corrector";
import type { Metadata } from 'next'
import LayoutOtherThanScene from '@/components/layout/layout-other-than-scene';
import HeaderBarWithContextProvider from '@/components/layout/header-bar-with-context-provider';


export const space_grotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin-ext'],
  variable: "--fonts-serious",
});

export const delius = Delius({
  weight: ["400",],
  style: ['normal'],
  subsets: ['latin'],
  variable: "--fonts-playful",
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
    backgroundColor: `rgb(${theme.vars.colors.secondary.background} / 50%)`,
    borderRadius: "5px",
  },
  "&::-webkit-scrollbar-button": {
    backgroundColor: "transparent", height: "0",
  },
  "a": { color: "inherit" },
  "body": {
    margin: 0, padding: 0, width: "100vw", height: "100vh", overflow: "hidden",
    backgroundColor: `rgb(${theme.vars.colors.primary.background})`,
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:site_name" content="zane-nostalgia.kiyo-n-zane.com" />
        <meta property="og:title" content="Z.Nostalgia" />
        <meta property="og:description" content="Z.Nostalgia is a web app for generating customizable, animated SVGs. Designed for easy integration into projects, available through HTTP endpoints. Use it to add unique visuals to GitHub READMEs, websites by simply embedding URL." />
      </head>
      <body className={[space_grotesk.variable, delius.variable].join(" ")}>
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
  title: "Z.Nostalgia",
  description: "Z.Nostalgia is a web app for generating customizable, animated SVGs. Designed for easy integration into projects, available through HTTP endpoints. Use it to add unique visuals to GitHub READMEs, websites by simply embedding URL.",
  applicationName: "Z.Nostalgia",
  keywords: ["svg background", "svg generator", "github readme", "github readme widget"],
  icons: "/favicon.svg",
}