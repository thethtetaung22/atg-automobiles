import Image from 'next/image';
import React from 'react';
import styles from '../../styles/Banner.module.scss';

const Banner = () => {
  return <div className={styles.container}>
        <div className={styles.leftContainer}>
            <span className={styles.text}>{'စိတ်ချ ယုံကြည် ATG'}</span>
            <span className={styles.subtext}>Most reliable car sales and services center.</span>
        </div>
        <div className={styles.rightContainer}>
            <div className={styles.imageContainer}>
                <Image
                    src={'/car-red.png'}
                    layout='responsive'
                    width={700}
                    height={400}
                    alt='car-red'/>
            </div>
        </div>
  </div>;
}

export default Banner;
