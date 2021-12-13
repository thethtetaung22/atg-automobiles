import styles from '../../styles/SearchArea.module.scss';
import { Button, OutlinedInput } from '@mui/material';

const SearchArea = () => {
    return (
        <div className={styles.container}>
            <div className={styles.bodyBg}></div>
            <div className={styles.body}>
                <span className={styles.title}> Search Here</span>
                <div className={styles.inputArea}>
                    <div className={styles.inputContainer}>
                        <OutlinedInput placeholder="Brand" className={styles.input} />
                        <OutlinedInput placeholder="Model (Year)" className={styles.input} />
                    </div>
                    <Button variant='contained' className={styles.searchButton}>Search</Button>
                </div>
            </div>
            
        </div>
    )
}

export default SearchArea;
