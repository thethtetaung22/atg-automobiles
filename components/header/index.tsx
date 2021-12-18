import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/Header.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import SideNav from '../sidenav';

const Header = () => {
    const [openSideNav, setOpenSideNav] = useState(true);
    return (
        <div className={styles.container}>
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
            <div className={styles.sideNavMenu}>
                <MenuIcon fontSize='large'/>
            </div>

            <div style={{display: openSideNav? 'flex': 'none'}} className={styles.sideNavContainer}>
                <h2 color='black'>a;sdfjk</h2>
                <div style={{color: "white"}}>hhh</div>
                <SideNav />
            </div>
        </div>
        
    )
}

export default Header;
