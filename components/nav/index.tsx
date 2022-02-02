import Link from 'next/link';
import styles from 'styles/Nav.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { useRouter } from 'next/router';

const NavBar = ({ toggle, isLoggedIn }: any) => {
    const router = useRouter();
    const isHome = router.route === '/';
    const handleOnSignOut = (event: any) => {
        event.preventDefault();
        window?.sessionStorage.removeItem('token');
        router.replace('/').then(() => {
            router.reload();
        });
    }

    return (
        <nav className={styles.container} style={{background: isHome ? 'linear-gradient(90deg, rgba(41, 14, 14, 0.452) 0%, rgb(143, 14, 14) 100%, rgb(224, 39, 39) 100%)':'', boxShadow: isHome ? 'none' : '', zIndex: isHome ? '0' : ''}}>
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
                    <Link href="/showroom">
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
            <div className={styles.sideNavMenu} onClick={toggle} style={{color: isHome ? 'white' : ''}}>
                <MenuIcon fontSize='large'/>
            </div>
        </nav>
        
    )
}

export default NavBar;
