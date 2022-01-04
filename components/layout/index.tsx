import NavBar from "../nav";
import styles from '../../styles/Layout.module.scss';
import SideNav from "../sidenav";
import { useEffect, useState } from "react";
import { validateToken } from "../../services/data.service";

const Layout = ({ children }: any) => {
    let [token, setToken] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    const validateSessionToken = async (token: string) => {
        try {
            if (await validateToken(token)) {
                setToken(token);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const sessionToken = window.sessionStorage.getItem('token');
        if (sessionToken) {
            validateSessionToken(sessionToken);
        }
    }, []);


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
