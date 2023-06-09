import * as React from 'react';
import { GlobalProvider } from '../content/global';
import '../src/app/globals.css'
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>

    </>
  );
}