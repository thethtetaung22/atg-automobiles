import Link from 'next/link';
import styles from '../../styles/Nav.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';

const NavBar = ({ toggle }: any) => {
    return (
        <nav className={styles.container}>
            <div className={styles.logo}>
                <Image
                    src={'/atglogo.png'}
                    width={150}
                    height={110}
                    />
            </div>
            <div className={styles.menus}>
                <div className={styles.link}>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </div>
                <div className={styles.link}>
                    <Link href="/about">
                        <a>About Us</a>
                    </Link>
                </div>
                <div className={styles.link}>
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                </div>
            </div>
            <div className={styles.sideNavMenu} onClick={toggle}>
                <MenuIcon fontSize='large'/>
            </div>
        </nav>
        
    )
}

export default NavBar;
