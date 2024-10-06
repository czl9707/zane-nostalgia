import * as React from "react"

import '@pigment-css/react/styles.css';
import { Lato, Dancing_Script } from 'next/font/google';
import { css } from '@pigment-css/react';

import NavigationPanel from "./NavigationPanel";


const lato = Lato({
  weight: ['300', '400', '700', '900'],
  style: ['italic', 'normal'],
  subsets: ['latin-ext']
});

const dancing = Dancing_Script({
  weight: ["400"],
  style: ['normal'],
  subsets: ['latin-ext']
});

const bodyProps = css(({ theme }) => ({
  margin: 0, padding: 0, width: "100vw", height: "100vh",
  backgroundColor: theme.vars.colors.primary.background,
}));

const globalVars = {
  "--lato-font-family": lato.style.fontFamily,
  "--dancing-font-family": dancing.style.fontFamily,
} as React.CSSProperties;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Zane&apos;s Nostalgia Moments</title>
        <meta name="description" content="Zane's Nostalgia Moments" />
        <link rel="icon" href="/favicon.svg" type="/src/image/svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={bodyProps} style={globalVars}>
        <NavigationPanel />
        {children}
      </body>
    </html>
  )
}
