import NavBar from "../nav";
import styles from '../../styles/Layout.module.scss';
import SideNav from "../sidenav";
import { useEffect, useState } from "react";

const Layout = ({ children, token }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={styles.container}>
            <SideNav isOpen={isOpen} toggle={toggleNav} isLoggedIn={!!token}/>
            <NavBar toggle={toggleNav} isLoggedIn={!!token}/>
            { children }
            {/* <Footer /> */}
        </div>
    )
}

export default Layout;
