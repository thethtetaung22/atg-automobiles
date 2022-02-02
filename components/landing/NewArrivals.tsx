import { ArrowForwardIos } from '@mui/icons-material';
import { Button, Divider } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from 'styles/NewArrivals.module.scss';
import CarCard from 'components/CarCard';
import { animated, config, useChain, useSpring, useSpringRef, useTransition } from 'react-spring';

const NewArrivals = ({ token, cars }: any) => {
  const router = useRouter();
  const [open, set] = useState(true);
  const springApi = useSpringRef();
  const transApi = useSpringRef();
  
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: '20%', background: 'hotpink' },
    to: {
      size: open ? '100%' : '20%',
      background: open ? 'white' : 'hotpink',
    },
  });
  const transition = useTransition(open ? cars : [], {
    ref: transApi,
    trail: 400 / cars?.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });
  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ]);

  return <div className={styles.container}>
    <span className={styles.title}> New Arrivals </span>

    <Divider variant='middle' className={styles.divider} />

    <div className={styles.carsContainer}>
      {
        cars?.length > 0 ?
          <animated.div
            style={{ ...rest, width: size, height: size }}
            className={styles.cardContainer}>
            {
              transition((style, item) => (
                <animated.div
                  className={styles.item}
                  style={{ ...style, background: item.css }}
                >
                  <CarCard car={item.car} token={token} bgTransparent={true}/>
                </animated.div>
              ))
            }
          </animated.div> :
          <div style={{
            display: 'flex',
            color:'gray',
            fontSize: '30px',
            height: '200px',
            alignItems:'center',
            justifyContent: 'center'
          }}>
            <span>No Data!</span>
          </div>
      }
    </div>
    {
      router.route === '/' &&
      <div className={styles.seeAllButton}>
        <Button 
          variant='contained'
          className={styles.button}
          endIcon={<ArrowForwardIos />}
          onClick={() => router.push('/showroom')}
        >
          See All
      </Button>
      </div>
    }
  </div>
}

export default NewArrivals;
