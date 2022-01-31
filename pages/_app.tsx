import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import Head from 'next/head'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [token, setToken] = useState<any>();

  useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <Layout token={token}>
       <Head>
        <title>ATG Automobiles</title>
        <link rel='icon' href='/atglogo.png' />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <Component {...pageProps} token={token}/>
    </Layout>
  )
}

export default MyApp
