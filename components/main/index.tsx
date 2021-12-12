import Body from "../body";
import Footer from "../footer";
import Header from "../header";
import styles from '../../styles/Main.module.scss';

const Main = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Header/>
            </div>
            <div className={styles.body}>
                <Body />
            </div>
            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    )
}

export default Main
