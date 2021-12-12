import type { NextPage } from 'next';
import Main from '../components/main';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Main />
    </div>
  )
}

export default Home
