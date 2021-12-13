import type { NextPage } from 'next';
import Head from 'next/head';
import Main from '../components/main';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ATG Automobiles</title>
      </Head>
      <Main />
    </div>
  )
}

export default Home
