import { Divider } from "@mui/material";
import styles from 'styles/CarList.module.scss';
import CarCard from "components/CarCard";
import { useState } from "react";
import { animated, config, useChain, useSpring, useSpringRef, useTransition } from "react-spring";

const CarList = ({ token, cars }: any) => {
    const [open, set] = useState(true);
    const springApi = useSpringRef()
    const { size, ...rest } = useSpring({
        ref: springApi,
        config: config.stiff,
        from: { size: '20%', background: 'hotpink' },
        to: {
        size: open ? '100%' : '20%',
        background: open ? 'white' : 'hotpink',
        },
    })

    const transApi = useSpringRef()
    const transition = useTransition(open ? cars : [], {
        ref: transApi,
        trail: 400 / cars.length,
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
    })

    // This will orchestrate the two animations above, comment the last arg and it creates a sequence
    useChain(open ? [springApi, transApi] : [transApi, springApi], [
        0,
        open ? 0.1 : 0.6,
    ]);
    

    return (
        <div className={styles.container}>

            <span className={styles.title}> ATG Automobiles </span>

            <Divider variant='middle' className={styles.divider} />
            <div className={styles.carListContainer}>
                <animated.div
                    style={{ ...rest, width: size, height: size, background: 'transparent' }}
                    className={styles.cardContainer}>
                    {
                        transition((style, item) => (
                            <animated.div
                                className={styles.item}
                                style={{ ...style, background: item.css }}
                            >
                                {
                                    <CarCard car={item.car} token={token} bgTransparent={true}/>
                                }
                            </animated.div>
                        ))
                    }
                </animated.div>
            </div>
        </div>
    );
}

export default CarList;
