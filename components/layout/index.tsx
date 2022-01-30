import NavBar from "../nav";
import styles from '../../styles/Layout.module.scss';
import SideNav from "../sidenav";
import { useEffect, useState } from "react";
import Footer from "../footer";
import { useRouter } from "next/router";

const Layout = ({ children, token }: any) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className={styles.container}>
            <SideNav isOpen={isOpen} toggle={toggleNav} isLoggedIn={!!token}/>
            {
                router.route !== '/' &&
                <NavBar toggle={toggleNav} isLoggedIn={!!token}/>
            }
            { children }
        </div>
    )
}

export default Layout;
