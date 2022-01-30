import { Divider } from '@mui/material';
import React from 'react';
import CarCard from '../components/CarCard';
import AddressFooter from '../components/footer/AddressFooter';
import NewArrivals from '../components/landing/NewArrivals';
import Map from '../components/Map/Map';
import { getCarsList } from '../services/data.service';
import styles from '../styles/About.module.scss';

  const About = ({ cars }: any) => {

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <div className={styles.textBackground}>
                        <div className={styles.header}>About Company</div>
                        <p className={styles.body}>AGT automobiles was founded in 2017 and is being operated by a group of young professionals in car industry with a simple idea. How do we serve our customers smarter, faster and easier? We hope to lead the automotive and mobility solutions market, by offering a better experience, democratizing information, and developing the automobile sector.
The global auto industry is highly competitive, and it is dominated by companies in Europe, Japan, the United States, and South Korea. You can check and buy the latest and greatest cars from more than 60 major automotive brands across the globe. Every automaker from Mazda to Chevy, Suzuki, and even exotic brands like McLaren and Lamborghini. We are here to serve the finest service in Myanmar.</p>

                </div>
            </div>
            <div className={styles.newArrivalsContainer}>
                <span className={styles.header}>New Arrivals</span>
                <Divider variant='middle' className={styles.divider} />
                <div className={styles.carsContainer}>
                    {
                        cars.map((car: any) => {
                            return <div className={styles.cardContainer} key={car.id}>
                                <CarCard car={car} />
                            </div>
                        })
                    }
                </div>
            </div>
            <div className={styles.mapsContainer}>
                <span className={styles.mapHeader}>Location</span>
                <Divider variant='middle' className={styles.divider} />
                <div className={styles.subHeaderContainer}>
                    <span>61(A), Between 116 x 117 st, Mandalay, Myanmar.</span>
                    <a className={styles.showOnMap} href='https://www.google.com/maps/@21.9181968,96.1109889,21z'>Show On Map</a>
                </div>
                <div className={styles.mapContainer}>
                    <Map />
                    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d231.33894679752703!2d96.11098982946099!3d21.918278354478108!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ssg!4v1642745407902!5m2!1sen!2ssg" width="600" height="450" style={{border:0, width: '100%'}} allowFullScreen loading="lazy"></iframe> */}
                </div>
            </div>
            <AddressFooter />
        </div>
    )
}

export default About;

export const getServerSideProps = async () => {
    let cars: any = null;
    const response = await getCarsList('take=4&skip=0');
    if (response?.status === 200 && response?.data?.result) {
      cars = response.data.result;
    }
    return {
        props: {
            cars
        }
    }
};
  