import '../styles/globals.css'
import type { AppProps } from 'next/app'
import awsconfig from '../src/aws-exports';
import { Amplify, Auth } from 'aws-amplify';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

Amplify.configure(awsconfig);

export default MyApp
