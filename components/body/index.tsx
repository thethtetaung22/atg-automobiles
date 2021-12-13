import styles from '../../styles/Body.module.scss';
import CarList from './CarList';
import SearchArea from './SearchArea';

const Body = () => {
    return (
        <div className={styles.container}>
            <SearchArea />
            <CarList />
        </div>
    )
}

export default Body;
