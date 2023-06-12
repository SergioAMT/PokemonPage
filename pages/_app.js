import * as React from 'react';
import { GlobalProvider } from '../content/global';
import '../src/styles/globals.css'
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>

    </>
  );
}