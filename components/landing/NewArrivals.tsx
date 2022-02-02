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
  let data = [
    {
      id: 0,
      name: 'Rare Wind',
      description: '#a8edea → #fed6e3',
      css: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      height: 200
    },
    {
      id: 1,
      name: 'Saint Petersburg',
      description: '#f5f7fa → #c3cfe2',
      css: 'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
      height: 400
    },
    {
      id: 2,
      name: 'Deep Blue',
      description: '#e0c3fc → #8ec5fc',
      css: 'linear-gradient(135deg, #fff1eb 0%, #ace0f9 100%)',
      height: 400
    }
  ];
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: '20%', background: 'hotpink' },
    to: {
      size: open ? '100%' : '20%',
      background: open ? 'white' : 'hotpink',
    },
  });
  const transition = useTransition(open ? data : [], {
    ref: transApi,
    trail: 400 / data.length,
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
      <animated.div
          style={{ ...rest, width: size, height: size }}
          className={styles.cardContainer}>
          {
            transition((style, item) => (
              <animated.div
                className={styles.item}
                style={{ ...style, background: item.css }}
              >
                <CarCard car={cars[item.id]} token={token} bgTransparent={true}/>
              </animated.div>
            ))
          }
        </animated.div>
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
