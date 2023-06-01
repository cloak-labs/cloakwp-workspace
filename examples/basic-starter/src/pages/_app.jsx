import '@/styles/globals.css'
import 'focus-visible'
import { Layout } from '@/components/Layout'
import { BlockConfigProvider } from 'cloakwp'
import myBlockConfig from '@/config/myBlockConfig'

export default function App({ Component, pageProps }) {
  return (
    <BlockConfigProvider value={myBlockConfig}>
      <Layout navBarData={pageProps.navBarData}>
        <Component {...pageProps} />
      </Layout>
    </BlockConfigProvider>
  )
}