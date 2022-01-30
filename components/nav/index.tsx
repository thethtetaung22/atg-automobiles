import Link from 'next/link';
import styles from '../../styles/Nav.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { useRouter } from 'next/router';

const NavBar = ({ toggle, isLoggedIn }: any) => {
    const router = useRouter();

    const handleOnSignOut = (event: any) => {
        event.preventDefault();
        window?.sessionStorage.removeItem('token');
        router.replace('/').then(() => {
            router.reload();
        });
    }

    return (
        <nav className={styles.container}>
            <div className={styles.logo}>
                <Image
                    src={'/atglogo.png'}
                    width={130}
                    height={90}
                    alt="logo"
                    />
            </div>
            <div className={styles.menus}>
                <div className={styles.link}>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </div>
                <div className={styles.link}>
                    <Link href="/cars/1">
                        <a>Showroom</a>
                    </Link>
                </div>
                <div className={styles.link}>
                    <Link href="/about">
                        <a>About Us</a>
                    </Link>
                </div>
                {/* {
                    !isLoggedIn && <div className={styles.link}>
                        <Link href="/login">
                            <a>Login</a>
                        </Link>
                    </div>
                } */}
                {
                    isLoggedIn && <div className={styles.link}>
                        <Link href="/car/create">
                            <a>Create</a>
                        </Link>
                    </div>
                }
                {
                    isLoggedIn && <div className={styles.signOutBtn} onClick={handleOnSignOut}>
                        Sign Out
                    </div>
                }
            </div>
            <div className={styles.sideNavMenu} onClick={toggle}>
                <MenuIcon fontSize='large'/>
            </div>
        </nav>
        
    )
}

export default NavBar;
