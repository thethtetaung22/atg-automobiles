import Footer from "../footer";
import NavBar from "../nav";
import styles from '../../styles/Layout.module.scss';
import SideNav from "../sidenav";
import { useState } from "react";

const Layout = ({ children }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div className={styles.container}>
            <SideNav isOpen={isOpen} toggle={toggleNav}/>
            <NavBar toggle={toggleNav}/>
            { children }
            <Footer />
        </div>
    )
}

export default Layout;
