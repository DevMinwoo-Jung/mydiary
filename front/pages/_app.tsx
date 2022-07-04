import AppLayout from 'components/AppLayout/AppLayout'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default MyApp
