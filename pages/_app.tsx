import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
       <Head>
        <title>ATG Automobiles</title>
      </Head>
      <Component {...pageProps}/>
    </Layout>
  )
}

export default MyApp
