import type { NextPage } from 'next';
import CarList from '../components/home/CarList';
import SearchArea from '../components/home/SearchArea';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
        <SearchArea />
        <div className={styles.carListContainer}>
            <CarList />
        </div>
    </div>
  )
}

export default Home
