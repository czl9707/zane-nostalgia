import '@pigment-css/react/styles.css';
import { Lato, Caveat } from 'next/font/google';
import { globalCss } from '@pigment-css/react';

import Header from './components/Header';


const lato = Lato({
  weight: ['300', '400', '700', '900'],
  style: ['italic', 'normal'],
  subsets: ['latin-ext']
});

const caveat = Caveat({
  weight: ["400"],
  style: ['normal'],
  subsets: ['latin-ext']
});

const globalVars = globalCss`
:root{
  --lato-font-family: ${lato.style.fontFamily};
  --caveat-font-family: ${caveat.style.fontFamily};
}
`

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
      <body style={{ margin: 0, padding: 0 }} className={globalVars}>
        <Header />
        {children}
      </body>
    </html>
  )
}
