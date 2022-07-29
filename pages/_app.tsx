import "../styles/globals.css";
import type { AppProps } from "next/app";
import awsconfig from "../src/aws-exports";
import { Amplify } from "@aws-amplify/core";
Amplify.configure({ ...awsconfig, ssr: true });

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
