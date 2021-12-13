import Link from 'next/link';
import styles from '../../styles/Header.module.scss';

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                ATG Automobiles
            </div>
            <div className={styles.menus}>
                <div className="link">
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </div>
                <div className="link">
                    <Link href="/about">
                        <a>About Us</a>
                    </Link>
                </div>
                <div className="link">
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                </div>
            </div>
        </div>
        
    )
}

export default Header;
