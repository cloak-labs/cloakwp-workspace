import '@/styles/globals.css'
import 'focus-visible'
import { Layout } from '@/components/Layout'
import { BlockConfigProvider } from 'cloakwp'
import myBlockConfig from '@/config/myBlockConfig'

export default function App({ Component, pageProps }) {
  const { enableLayout = true } = pageProps

  return (
    <BlockConfigProvider blocks={myBlockConfig}>
      {enableLayout ? (
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}
    </BlockConfigProvider>
  )
}