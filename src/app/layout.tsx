'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { RecoilRoot } from 'recoil';
import { CacheProvider as Emotion10Provider } from '@emotion/react';

const inter = Inter({ subsets: ["latin"] });

const cache = createCache({ key: 'css', prepend: true });

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // light blue
    },
    secondary: {
      main: '#f48fb1', // light pink
    },
    background: {
      default: '#121212', // dark background
      paper: '#1d1d1d',   // slightly lighter dark background
    },
    text: {
      primary: '#ffffff', // white text
      secondary: '#bbbbbb', // light grey text
    },
  },
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>
      <body className={inter.className}>
        <CacheProvider value={cache}>
          <Emotion10Provider value={cache}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <RecoilRoot>
                {children}
                </RecoilRoot>
              </ThemeProvider>
          </Emotion10Provider>
        </CacheProvider>
      </body>
    </html>
  );
}
