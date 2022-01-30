import Image from 'next/image';
import React from 'react';
import styles from '../../styles/Brands.module.scss';

const Brands = () => {
    return <div className={styles.container}>
        <span className={styles.header}>Top Brands</span>
        <div className={styles.logosContainer}>
            <div className={styles.logo}>
                <Image
                    alt='toyota'
                    src={'/toyota-logo.png'}
                    width={100}
                    height={100}
                    layout='fixed'
                />
                <span className={styles.name}>Toyota</span>
            </div>

            <div className={styles.logo}>
                <Image
                    alt='honda'
                    src={'/honda-logo.png'}
                    width={100}
                    height={100}
                    layout='fixed'
                />
                <span className={styles.name}>Honda</span>
            </div>

            <div className={styles.logo}>
                <Image
                    alt='lexus'
                    src={'/lexus-logo.png'}
                    width={100}
                    height={100}
                    layout='fixed'
                />
                <span className={styles.name}>Lexus</span>
            </div>

            <div className={styles.logo}>
                <Image
                    alt='hyundai'
                    src={'/hyundai-logo.png'}
                    width={100}
                    height={100}
                    layout='fixed'
                />
                <span className={styles.name}>Hyundai</span>
            </div>

            <div className={styles.logo}>
                <Image
                    alt='audi'
                    src={'/audi-logo.png'}
                    width={200}
                    height={80}
                    layout='fixed'
                />
                <span className={styles.name}>Audi</span>
            </div>

            <div className={styles.logo}>
                <Image
                    alt='mercedes'
                    src={'/mercedes-logo.png'}
                    width={130}
                    height={100}
                    layout='fixed'
                />
                <span className={styles.name}>Mercedes</span>
            </div>

            <div className={styles.logo}>
                <Image
                    alt='mazda'
                    src={'/mazda-logo.png'}
                    width={130}
                    height={100}
                    layout='fixed'
                />
                <span className={styles.name}>Mazda</span>
            </div>
        </div>
    </div>
}

export default Brands;
