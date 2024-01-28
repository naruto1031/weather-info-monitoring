import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
// import serviceAccount from '../../weather-info-monitoring-firebase.json';
// import { cert } from 'firebase-admin/app';
// import admin from 'firebase-admin';

// if (admin.apps.length === 0) {
//   admin.initializeApp({
//     credential: cert(serviceAccount as admin.ServiceAccount),
//   });
// }
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
