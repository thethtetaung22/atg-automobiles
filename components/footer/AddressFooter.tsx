import { Facebook, YouTube } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import Footer from '.';
import styles from 'styles/AddressFooter.module.scss';

const AddressFooter = () => {
    return (
        <div className={styles.container}>
            <div className={styles.contentsContainer}>
                <div className={styles.detailsContainer}>
                    <h2>ATG AUTOMOBILES</h2>
                    <span>61(A), Between 116 x 117 st,</span>
                    <span>Mandalay, Myanmar.</span>
                    <span>contact@atgautomobiles.com</span>
                    <span><a href="tel:+959777555881">09 777 555 881</a></span>
                </div>
                    
                <div className={styles.externalLinksContainer}>
                    <div>Follow Us On : </div>
                    <div className={styles.links}>
                        <IconButton onClick={() => {
                                window.location.href="https://www.facebook.com/atgcarsales"
                            }}>
                            <Facebook style={{fontSize: '40px', color: 'white', margin: '5px'}}/>
                        </IconButton>
                        <IconButton onClick={() => {
                            window.location.href="https://youtube.com/channel/UCFHs7xy-HWWMlbXgLGsbuLA"
                        }}>
                            <YouTube style={{fontSize: '45px', color: 'white', margin: '5px'}}/>
                        </IconButton>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AddressFooter
