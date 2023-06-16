import '@/styles/globals.css'
import 'focus-visible'
import { Layout } from '@/components/Layout'
import { BlockConfigProvider } from 'cloakwp'
import myBlockConfig from '@/config/myBlockConfig'
import Head from 'next/head'
import parse from 'html-react-parser';

export default function App({ Component, pageProps }) {
  const { enableLayout = true, pageData } = pageProps
  const { yoast_head } = pageData || {}

  return (
    <BlockConfigProvider blocks={myBlockConfig}>
      {yoast_head &&
        <Head>
          {parse(yoast_head)}
        </Head>
      }
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