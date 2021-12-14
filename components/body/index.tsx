import styles from '../../styles/Body.module.scss';
import CarList from './Children/CarList';
import SearchArea from './Children/SearchArea';

const Body = () => {
    return (
        <div className={styles.container}>
            <SearchArea />
            <div className={styles.carListContainer}>
                <CarList />
            </div>
        </div>
    )
}

export default Body;
