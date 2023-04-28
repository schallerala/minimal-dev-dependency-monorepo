import "../styles/globals.css";
// include styles from the @acme/ui package
import "@acme/ui/styles.css";

import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
