import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Nav.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import SideNav from '../sidenav';

const NavBar = ({ toggle }: any) => {
    let [openSideNav, setOpenSideNav] = useState(false);
    return (
        <nav className={styles.container}>
            <div className={styles.logo}>
                ATG Automobiles
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
