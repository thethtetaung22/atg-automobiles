import Link from "next/link";
import styles from '../../styles/SideNav.module.scss';

const SideNav = () => {
    return (
        <div className={styles.container}>
            <div style={{color: "white"}}>hh</div>
            <div>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </div>
            <div>
                <Link href="/about">
                    <a>About Us</a>
                </Link>
            </div>
            <div>
                <Link href="/login">
                    <a>Login</a>
                </Link>
            </div>
        </div>
    )
}

export default SideNav;
