import { Close } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from '../../styles/SideNav.module.scss';

const SideNav = ({ isOpen, toggle }: any) => {
    const router = useRouter();

    const handleRouter = (route: string) => {
        toggle();
        router.push(route);
    }

    const isCurrentRoute = (route: string) => {
        return route === router.pathname;
    }

    return (
        <div className={styles.container} style={{opacity: isOpen? '100%' : 0, top: isOpen? 0 : '-100%'}}>
            <div className={styles.closeToggle} onClick={toggle}>
                <Close fontSize="large"/>
            </div>
            <div className={styles.wrapper}>
                <ul className={styles.menus}>
                    <div onClick={() => handleRouter('/')} style={{color: isCurrentRoute('/') ? '#fc3636':''}}>
                        <a>Home</a>
                    </div>
                    <div onClick={() => handleRouter('/about')} style={{color: isCurrentRoute('/about') ? '#fc3636':''}}>
                        <a>About Us</a>
                    </div>
                    <div onClick={() => handleRouter('/login')} style={{color: isCurrentRoute('/login') ? '#fc3636':''}}>
                        <a>Login</a>
                    </div>
                    <div onClick={() => handleRouter('/car/create')} style={{color: isCurrentRoute('/car/create') ? '#fc3636':''}}>
                        <a>Create</a>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default SideNav;
