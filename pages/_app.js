import * as React from 'react';
import { GlobalProvider } from '../content/global';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>

    </>
  );
}