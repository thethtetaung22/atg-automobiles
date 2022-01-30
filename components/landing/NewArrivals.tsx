import { ArrowForwardIos } from '@mui/icons-material';
import { Button, Divider } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import styles from '../../styles/NewArrivals.module.scss';
import CarCard from '../CarCard';

const NewArrivals = ({ token, cars }: any) => {
  const router = useRouter();

  return <div className={styles.container}>
    <span className={styles.title}> New Arrivals </span>

    <Divider variant='middle' className={styles.divider} />

    <div className={styles.carsContainer}>
      {
        cars ?
        cars.map((car: any) => {
          return <div className={styles.cardContainer} key={car.id}>
            <CarCard  car={car} token={token}/>
          </div>
        }) : <>No Data!</>
      }
    </div>
    {
      router.route === '/' &&
      <div className={styles.seeAllButton}>
        <Button 
          variant='contained'
          className={styles.button}
          endIcon={<ArrowForwardIos />}
          onClick={() => router.push('/cars/1')}
        >
          See All
      </Button>
      </div>
    }
  </div>
}

export default NewArrivals;
