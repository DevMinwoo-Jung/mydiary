/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
import AppLayout from 'components/AppLayout/AppLayout'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'
import Head from 'next/head'
import wrapper from '../store/configureStore'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  )
}

export default wrapper.withRedux(MyApp)
